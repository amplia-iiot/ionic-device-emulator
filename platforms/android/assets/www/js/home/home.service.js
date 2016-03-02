angular.module("starter.home")

.factory("homeService", function (
     $http
    ,$cordovaToast
    ,$q
    ,$ionicPopup
    ,services
    ,$ionicLoading
    ) {


    userData = {};
    service = {};


    function guid() {
        function _p8(s) {
            var p = (Math.random().toString(16)+"000000000").substr(2,8);
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    }


    function show() {
        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>'
        });
    };

    function hide(){
        $ionicLoading.hide();
    };
    

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


    service.fillCloudCrudInfo = function (defered, userData){

        var link = "http://" + userData.host + ":" + userData.north_port + "/v70/provision/organizations/" 
            + userData.organization + "/entities/devices/" + device.uuid;

        show($ionicLoading);

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
            })
            .error(function (data, status, headers, config){
                defered.reject(data);
            })
            .finally(function($ionicLoading) { 
              hide($ionicLoading);  
            });

    }

    service.postCrudInfo = function (crudInfo, userData) {

        var link = "http://" + userData.host + ":" + userData.north_port + "/v70/provision/organizations/" 
            + userData.organization + "/entities/devices";

        var request = {
            url: link,
            method: "POST",
            data: crudInfo,
            headers: {
              "X-ApiKey": userData.apikey,
              "Content-Type": "application/json"
            }
        };

        show($ionicLoading);

        $http(request)
            .success(function (data, status, headers, config){ 
              $cordovaToast.show("Device created", "short", "center")
            })
            .error(function (data, status, headers, config){
              $cordovaToast.show("Cannot create the device", "short", "center")
              $cordovaToast.show(status, "long", "center")
            })
            .finally(function($ionicLoading) { 
              hide($ionicLoading);  
            });
        
        }


    service.putCrudInfo = function (crudInfo, userData) {

        var link = "http://" + userData.host + ":" + userData.north_port + "/v70/provision/organizations/" 
            + userData.organization + "/entities/devices/" + device.uuid;

        var request = {
            url: link,
            method: "PUT",
            data: crudInfo,
            headers: {
              "X-ApiKey": userData.apikey,
              "Content-Type": "application/json"
            }
        };

        show($ionicLoading);

        $http(request)
            .success(function (data, status, headers, config){
               $cordovaToast.show("Device updated ", "short", "center")
            })
            .error(function (data, status, headers, config){
              $cordovaToast.show("Cannot update the device", "short", "center")
              $cordovaToast.show(status, "long", "center")
            })
            .finally(function($ionicLoading) { 
              hide($ionicLoading);  
            });

        
        }


    service.deleteDeviceDialog = function(userData){

        var confirmPopup = $ionicPopup.confirm({
            title: "Delete device",
            template: "Do you want to delete this device?"
        });

        confirmPopup.then(function(res) {
            if(res) {
                service.deleteDevice(userData);
            }
        });
    }    

    service.deleteDevice = function (userData){

        var link = "http://" + userData.host + ":" + userData.north_port + "/v70/provision/organizations/" 
            + userData.organization + "/entities/devices/" + device.uuid;

        var request = {
            url: link,
            method: "DELETE",
            headers: {
              "X-ApiKey": userData.apikey,
            }
        };

        show($ionicLoading);

        $http(request)
            .success(function (data, status, headers, config){ 
              $cordovaToast.show("Device deleted", "short", "center")
            })
            .error(function (data, status, headers, config){
            })
            .finally(function($ionicLoading) { 
              hide($ionicLoading);  
            });

    }

    service.sendCrudData = function (crudInfo, userData){

        var link = "http://" + userData.host + ":" + userData.north_port + "/v70/provision/organizations/" 
            + userData.organization + "/entities/devices/" + device.uuid;

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
                    service.createDeviceDialog(crudInfo, userData);
                } else {
                    service.updateDeviceDialog(crudInfo, userData);
                }
            })
            .error(function (data, status, headers, config){
                $cordovaToast.show("error", "short", "center")
            });
    }


    service.createDeviceDialog = function (crudInfo, userData){

        var confirmPopup = $ionicPopup.confirm({
            title: "Device not found",
            template: "This device isn\'t created yet, do you want to create it with the default data?"
        });

        confirmPopup.then(function(res) {
            if(res) {
                service.postCrudInfo(crudInfo, userData);
            } else {

            }
        });
    }    

    service.updateDeviceDialog = function (crudInfo, userData){

        var confirmPopup = $ionicPopup.confirm({
            title: "Device created",
            template: "This device is created, do you want to update it?"
        });

        confirmPopup.then(function(res) {
            if(res) {
                service.putCrudInfo(crudInfo, userData);
            } else {

            }
        });
    }

    service.fillCrudDialog = function (userData){

        var defered = $q.defer();
        var promise = defered.promise;

      var myPopup = $ionicPopup.show({
        template: "Do you want to use the default data or the cloud data?",
        title: "Fill crud data",
        buttons: [
            {
                text: "Default",
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
                    var crudInfo = service.fillCloudCrudInfo(defered, userData);
                }
            }
        ]
      });

      return promise;

    }


    return service;

});