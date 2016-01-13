angular.module("starter.services", ["ngCordova"])

.factory("service", function ($http, $cordovaToast, $q, $ionicPopup, $timeout, $cordovaBarcodeScanner) {
    
    service = {};

    function guid() {
        function _p8(s) {
            var p = (Math.random().toString(16)+"000000000").substr(2,8);
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    }


//**********************************************//
//*************** DEFAULT INFO *****************//
//**********************************************//

    service.fillDefaultDmmInfo = function () {

        dmmInfo = {
            "event": {
                "id": new Date().getTime(),
                "device": {
                    "id": device.uuid,
                    "name": "Virtual Device",
                    "description": "Virtual Device for Testing 3",
                    "hardware": {
                        "serialnumber": device.uuid,
                        "manufacturer": {
                            "name": "amplia)))",
                            "oui": "41-B9-72"
                        },
                        "model": {
                            "name": "BloodPressure"
                        }
                    },
                    "softwareList": [
                        {
                            "name": "BloodPressure",
                            "type": "FIRMWARE",
                            "version": "1.0",
                            "date": "2012-09-11T13:02:41Z"
                        }
                    ],
                    "specificType": "METER",
                    "location": {
                        "timestamp": new Date().toISOString(),
                        "coordinates": {
                            "latitude": 42.41677,
                            "longitude": -3.7028
                        }
                    },
                    "temperature": {
                        "unit": "C",
                        "current": "33",
                        "status": "NORMAL",
                        "trend": "DECREASING",
                        "average": "20",
                        "maximum": "25",
                        "minimum": "15"
                    },
                    "operationalStatus": "UP",
                    "powerSupply": {
                        "source": "BATTERY",
                        "status": "NORMAL",
                        "batteryChargeLevel": {
                            "trend": "EMPTY",
                            "status": "CHARGED",
                            "percentage": "50"
                        }
                    },
                    "communicationsModules": [
                        {
                            "name": "Bluetooth Module",
                            "type": "Bluetooth",
                            "hardware": {
                                "serialnumber": guid(),
                                "manufacturer": {
                                    "name": "amplia)))",
                                    "oui": "8C-EA-42"
                                },
                                "model": {
                                    "name": "ABT"
                                }
                            },
                            "subscription": {
                                "name": "bluetooh_network",
                                "description": "Bluetooth Network"
                            }
                        }
                    ]
                }
            }

        };

        return dmmInfo;

    }

    service.fillDefaultCrudInfo = function () {

        var id = device.uuid;
        crudInfo = {
            "device": {
                "id": id,
                "provision": {
                    "customId": [ id ],
                    "template": "default",
                    "type": "gateway",
                    "specificType": [
                        "COORDINATOR"
                    ],
                    "name" : [ id ],
                    "description" : ["Device for testing purposes 1"],
                    "admin": {
                        "organization": "amplia_rd",
                        "channel": "default_channel",
                        "administrativeState": "ACTIVE",
                        "serviceGroup": "emptyServiceGroup"
                    }
                }
            }
        
        };
        return crudInfo;    
    }


//**********************************************//
//**************** CLOUD INFO ******************//
//**********************************************//

    service.fillCloudCrudInfo = function (defered){
        var userData = service.getUserData();
        var crudInfo;
        var link = userData.uri + "/" + userData.organization + "/entities/devices/" + userData.id;
        var request = {
            url: link,
            method: "GET",
            headers: {
              "X-ApiKey": userData.apikey,
            }
        };

        $http(request)
            .success(function (data, status, headers, config){ 
                defered.resolve(data);
              $cordovaToast.show("Device filled", "long", "center")
            })
            .error(function (data, status, headers, config){
                defered.reject(data);
              $cordovaToast.show("Cannot fill the device", "long", "center")
            });

    }


//**********************************************//
//******************** POST ********************//
//**********************************************//

    service.postCrudInfo = function (crudInfo) {

        var userData = service.getUserData();

        var link = userData.uri + "/" + userData.organization + "/entities/devices";

        var request = {
            url: link,
            method: "POST",
            data: crudInfo,
            headers: {
              "X-ApiKey": userData.apikey,
              "Content-Type": "application/json"
            }
        };
        $http(request)
            .success(function (data, status, headers, config){ 
              $cordovaToast.show("Device created", "long", "center")

            })
            .error(function (data, status, headers, config){
              $cordovaToast.show("Cannot create the device", "long", "center")

            });        
        }

    service.postDmmInfo = function (dmmInfo) {

    }

    service.postIotInfo = function (iotInfo){

    }


//**********************************************//
//********************* PUT ********************//
//**********************************************//

    service.putCrudInfo = function (crudInfo) {

        var userData = service.getUserData();
        var link = userData.uri + "/" + userData.organization + "/entities/devices/" + userData.id;
        var request = {
            url: link,
            method: "PUT",
            data: crudInfo,
            headers: {
              "X-ApiKey": userData.apikey,
              "Content-Type": "application/json"
            }
        };
        $http(request)
            .success(function (data, status, headers, config){
               $cordovaToast.show("Device updated ", "long", "center")

            })
            .error(function (data, status, headers, config){
              $cordovaToast.show("Cannot update the device", "long", "center")

            });
        
        }


//**********************************************//
//****************** DELETE ********************//
//**********************************************//

    service.deleteDevice = function (crudInfo){

        var userData = service.getUserData();

        var link = userData.uri + "/" + userData.organization + "/entities/devices/" + userData.id;

        var request = {
            url: link,
            method: "DELETE",
            headers: {
              "X-ApiKey": userData.apikey,
            }
        };
        $http(request)
            .success(function (data, status, headers, config){ 
              $cordovaToast.show("Device deleted", "long", "center")
            })
            .error(function (data, status, headers, config){
            });
    }



//**********************************************//
//*****************            *****************//
//**********************************************//


    service.sendCrudData = function (crudInfo){

        var userData = service.getUserData();
        var link = userData.uri + "/" + userData.organization + "/entities/devices/" + userData.id;
        var request = {
            url: link,
            method: "GET",
            headers: {
              "X-ApiKey": userData.apikey,
            }
        };
        $http(request)
            .success(function (data, status, headers, config){ 
                if (JSON.stringify(status) == 204){
                    service.createDeviceDialog(crudInfo);
                } else {
                    service.updateDeviceDialog(crudInfo);
                }
            })
            .error(function (data, status, headers, config){
                $cordovaToast.show("error", "long", "center")
            });
    }


//**********************************************//
//******************* DIALOGS ******************//
//**********************************************//

    service.createDeviceDialog = function(crudInfo){

        var confirmPopup = $ionicPopup.confirm({
            title: "Device not found",
            template: "This device isn\'t created yet, do you want to create it with the default data?"
        });

        confirmPopup.then(function(res) {
            if(res) {
                service.postCrudInfo(crudInfo);
            } else {

            }
        });
    }    

    service.updateDeviceDialog = function(crudInfo){

        var confirmPopup = $ionicPopup.confirm({
            title: "Device created",
            template: "This device is created, do you want to update it?"
        });

        confirmPopup.then(function(res) {
            if(res) {
                service.putCrudInfo(crudInfo);
            } else {

            }
        });
    }

    service.fillCrudDialog = function (){

        var defered = $q.defer();
        var promise = defered.promise;


      var myPopup = $ionicPopup.show({
        template: "Do you want to use the default data or the cloud data?",
        title: "Fill crud data",
        buttons: [
          { text: "Default",
            type: "button-positive",
            onTap: function(e) {
                var crudInfo = service.fillDefaultCrudInfo();
                defered.resolve(crudInfo)
            } 
        },
          {
            text: "Cloud",
            type: "button-positive",
            onTap: function(e) {
                var crudInfo = service.fillCloudCrudInfo(defered);
            }
          }
        ]
      });

      return promise;

    }

    service.getUserData = function(){

        userData = {
            "email": "david.robles@amplia.es",
            "apikey": "925f11cc-2b25-4cc1-a076-6a2df9472e57",
            "channels": "default_channel",
            "organization": "amplia_rd",
            "uri": "http://cloud.opengate.es:25281/v70/provision/organizations",     
            "id": device.uuid
        };        

        return userData;
    }

    return service;

});