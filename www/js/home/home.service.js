angular.module("starter.home")

.factory("homeService", function(
    $http, $cordovaToast, $q, $ionicPopup, services, $ionicLoading, opengate
) {


    userData = {};
    service = {};


    function guid() {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    }


    function show() {
        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>'
        });
    };

    function hide() {
        $ionicLoading.hide();
    };


    service.fillDefaultCrudInfo = function(userData) {

        var id = userData.entityKey;
        crudInfo = {
            "device": {
                "id": id,
                "provision": {
                    "customId": id,
                    "template": "default",
                    "type": "gateway",
                    "specificType": [
                        "COORDINATOR"
                    ],
                    "name": id,
                    "description": "Device for testing purposes 1",
                    "admin": {
                        "organization": userData.organization,
                        "channel": userData.channel,
                        "administrativeState": "ACTIVE",
                        "serviceGroup": "emptyServiceGroup"
                    }
                }
            }
        };
        return crudInfo;
    }


    service.fillCloudCrudInfo = function(defered, userData) {
        try{
            show($ionicLoading);
            apiR = opengate.api(userData);
            //$cordovaToast.show(userData.organization + "  "+  userData.entityKey, "short", "center")
            var devices = apiR().newDeviceFinder();
            //$cordovaToast.show(userData.organization + "  "+  userData.entityKey, "short", "center")
            devices.findByOrganizationAndId(userData.organization, userData.entityKey)
                .then(function(res) {
                    //$cordovaToast.show(res, "short", "center")
                    if (res.statusCode !== 200) {
                        defered.reject(res.statusCode);
                    } else {
                        var crudInfo = {
                            "device": res.data
                        };
                        defered.resolve(crudInfo);
                    }
                })
                .catch(function(error) {
                    defered.reject(error.statusCode);
                })
                .finally(function() {
                    hide($ionicLoading);
                });
        }
        catch(err){
            defered.reject(error);
            hide($ionicLoading);
        }
    }

    service.postCrudInfo = function(crudInfo, userData) {
        show($ionicLoading);
        apiR = opengate.api(userData);
        var deviceBuilder = apiR().devicesBuilder();
        deviceBuilder.withEntityKey(userData.entityKey)
        .withName(crudInfo.device.provision.name)
        .withType("gateway").withSpecificType("COORDINATOR")
        .withDescription(crudInfo.device.provision.description).withOrganization(userData.organization)
        .withChannel(userData.channel).withAdministrativeState("ACTIVE").withServiceGroup("emptyServiceGroup");
        
        deviceBuilder.create()
        .then(function(data) {
                $cordovaToast.show("Device created", "short", "center")
            })
            .catch(function(error) {
                $cordovaToast.show("Cannot create the device", "short", "center")
                $cordovaToast.show(status, "long", "center")
            })
            .finally(function() {
                hide($ionicLoading);
            });


    }


    service.putCrudInfo = function(crudInfo, userData) {
        show($ionicLoading);
        apiR = opengate.api(userData);
        var deviceBuilder = apiR().devicesBuilder();
        $cordovaToast.show(userData.entityKey, "short", "center")

        deviceBuilder.withEntityKey(userData.entityKey);
         $cordovaToast.show(userData.entityKey, "short", "center")
        deviceBuilder.withName(crudInfo.device.provision.name);
         $cordovaToast.show(crudInfo.device.provision.type, "short", "center")
        deviceBuilder.withType(crudInfo.device.provision.type);
         $cordovaToast.show("COORDINATOR", "short", "center")
        deviceBuilder.withSpecificType("COORDINATOR");
         $cordovaToast.show(crudInfo.device.provision.description, "short", "center")
        deviceBuilder.withDescription(crudInfo.device.provision.description);
         $cordovaToast.show(userData.organization, "short", "center")
        deviceBuilder.withOrganization(userData.organization);
         $cordovaToast.show(userData.channel, "short", "center")
        deviceBuilder.withChannel(userData.channel);
         $cordovaToast.show(crudInfo.device.provision.admin.administrativeState, "short", "center")
        deviceBuilder.withAdministrativeState(crudInfo.device.provision.admin.administrativeState);
        $cordovaToast.show(crudInfo.device.provision.admin.serviceGroup, "short", "center")
        deviceBuilder.withServiceGroup(crudInfo.device.provision.admin.serviceGroup);
        $cordovaToast.show("before update ", "short", "center")
        deviceBuilder.update()
            .then(function(data) {
                $cordovaToast.show("Device updated ", "short", "center")
            })
            .catch(function(error) {
                $cordovaToast.show("Cannot update the device", "short", "center")
                $cordovaToast.show(status, "long", "center")
            })
            .finally(function() {
                hide($ionicLoading);
            });

    }


    service.deleteDeviceDialog = function(userData) {

        var confirmPopup = $ionicPopup.confirm({
            title: "Delete device",
            template: "Do you want to delete this device?"
        });

        confirmPopup.then(function(res) {
            if (res) {
                service.deleteDevice(userData);
            }
        });
    }

    service.deleteDevice = function(userData) {
        show($ionicLoading);
        apiR = opengate.api(userData);
        var deviceBuilder = apiR().devicesBuilder();
        deviceBuilder.withEntityKey(userData.entityKey).withOrganization(userData.organization);
        deviceBuilder.delete()
            .then(function(data) {
                $cordovaToast.show("Device deleted", "short", "center")
            })
            .catch(function(error) {

            })
            .finally(function() {
                hide($ionicLoading);
            });
    }

    service.sendCrudData = function(crudInfo, userData) {
        apiR = opengate.api(userData);
        var devices = apiR().newDeviceFinder();
        devices.findByOrganizationAndId(userData.organization, userData.entityKey)
            .then(function(data) {
                if (JSON.stringify(data.statusCode) === 204) {
                    service.createDeviceDialog(crudInfo, userData);
                } else {
                    service.updateDeviceDialog(crudInfo, userData);
                }
            })
            .catch(function(error) {
                if (error.statusCode === 404) {
                    service.createDeviceDialog(crudInfo, userData);
                } else {
                    defered.reject(error)
                }
            });

    }


    service.createDeviceDialog = function(crudInfo, userData) {

        var confirmPopup = $ionicPopup.confirm({
            title: "Device " + crudInfo.device.id + " not found",
            template: "This device isn\'t created yet, do you want to create it with the default data?"
        });

        confirmPopup.then(function(res) {
            if (res) {
                service.postCrudInfo(crudInfo, userData);
            } else {

            }
        });
    }

    service.updateDeviceDialog = function(crudInfo, userData) {

        var confirmPopup = $ionicPopup.confirm({
            title: "Device created",
            template: "This device is created, do you want to update it?"
        });

        confirmPopup.then(function(res) {
            if (res) {
                service.putCrudInfo(crudInfo, userData);
            } else {

            }
        });
    }

    service.fillCrudDialog = function(userData) {

        var defered = $q.defer();
        var promise = defered.promise;

        var myPopup = $ionicPopup.show({
            template: "Do you want to use the default data or the cloud data?",
            title: "Fill crud data",
            buttons: [{
                text: "Default",
                type: "button-positive",
                onTap: function(e) {
                    var crudInfo = service.fillDefaultCrudInfo(userData);
                    defered.resolve(crudInfo)
                }
            }, {
                text: "Cloud",
                type: "button-positive",
                onTap: function(e) {
                    var crudInfo = service.fillCloudCrudInfo(defered, userData);
                }
            }]
        });

        return promise;

    }


    return service;

});