angular.module("starter.home")

.factory("homeService", function ($http, $cordovaToast, $q, $ionicPopup,
         $timeout, $cordovaBarcodeScanner, services) {
    userData = {};
    service = {};
    function guid() {
        function _p8(s) {
            var p = (Math.random().toString(16)+"000000000").substr(2,8);
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    }



    service.getUserData = function (){

        services.getData()
        .then(function(data){
            userData = data;

        })
        .catch(function(){
          $cordovaToast.show("error", "long", "center")
        });

        return userData;
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


    service.fillCloudCrudInfo = function (defered){
        var userData = service.getUserData();
        var crudInfo;
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
                defered.resolve(data);
              $cordovaToast.show("Device filled", "short", "center")
            })
            .error(function (data, status, headers, config){
                defered.reject(data);
              $cordovaToast.show(status, "short", "center")
              $cordovaToast.show("Cannot fill the device", "short", "center")
            });

    }

    service.postCrudInfo = function (crudInfo) {

        var userData = service.getUserData();

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
        $http(request)
            .success(function (data, status, headers, config){ 
              $cordovaToast.show("Device created", "short", "center")

            })
            .error(function (data, status, headers, config){
              $cordovaToast.show("Cannot create the device", "short", "center")
              $cordovaToast.show(status, "short", "center")
            });        
        }


    service.putCrudInfo = function (crudInfo) {

        var userData = service.getUserData();
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
        $http(request)
            .success(function (data, status, headers, config){
               $cordovaToast.show("Device updated ", "short", "center")

            })
            .error(function (data, status, headers, config){
              $cordovaToast.show(status, "short", "center")
              $cordovaToast.show("Cannot update the device", "short", "center")

            });
        
        }


    service.deleteDeviceDialog = function(){

        var confirmPopup = $ionicPopup.confirm({
            title: "Delete device",
            template: "Do you want to delete this device?"
        });

        confirmPopup.then(function(res) {
            if(res) {
                service.deleteDevice();
            } else {

            }
        });
    }    

    service.deleteDevice = function (){

        var userData = service.getUserData();
        var link = "http://" + userData.host + ":" + userData.north_port + "/v70/provision/organizations/" 
            + userData.organization + "/entities/devices/" + device.uuid;

        var request = {
            url: link,
            method: "DELETE",
            headers: {
              "X-ApiKey": userData.apikey,
            }
        };
        $http(request)
            .success(function (data, status, headers, config){ 
              $cordovaToast.show("Device deleted", "short", "center")
            })
            .error(function (data, status, headers, config){
            });
    }

    service.sendCrudData = function (crudInfo){

        var userData = service.getUserData();
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
                    service.createDeviceDialog(crudInfo);
                } else {
                    service.updateDeviceDialog(crudInfo);
                }
            })
            .error(function (data, status, headers, config){
                $cordovaToast.show("error", "short", "center")
            });
    }


    service.createDeviceDialog = function (crudInfo){

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

    service.updateDeviceDialog = function (crudInfo){

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


    return service;

});