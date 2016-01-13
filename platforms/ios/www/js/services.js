angular.module("starter.services", ["ngCordova"])

.factory("service", function ($http, $cordovaToast, $ionicPopup, $timeout) {
    
    service = {};

    function guid() {
        function _p8(s) {
            var p = (Math.random().toString(16)+"000000000").substr(2,8);
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    }

/////////////////////////////////////////////////////

    service.fillDefaultDmmInfo = function () {

        dmmInfo = {
            "event": {
                "id": new Date().getTime(),
                "device": {
                    "id": "device.uuid",
                    "name": "Virtual Device",
                    "description": "Virtual Device for Testing 3",
                    "hardware": {
                        "serialnumber": "device.uuid",
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

    service.fillDefaultIotInfo = function (){

    }

/////////////////////////////////////////////////////
    
    service.postCrudInfo = function (crudInfo) {

        var link = "http://cloud.opengate.es:25281/v70/provision/organizations/amplia_rd/entities/devices";
        var request = {
            url: link,
            method: "POST",
            data: crudInfo,
            headers: {
              "X-ApiKey": "925f11cc-2b25-4cc1-a076-6a2df9472e57",
              "Content-Type": "application/json"
            }
        };
        $http(request)
            .success(function (data, status, headers, config){ 
              $cordovaToast.show("Created device", "long", "center")

            })
            .error(function (data, status, headers, config){
              $cordovaToast.show("Cannot create the device", "long", "center")

            });
        
        }

    service.postDmmInfo = function (dmmInfo) {

    }

    service.postIotInfo = function (iotInfo){

    }


/////////////////////////////////////////////////////


    service.putCrudInfo = function (crudInfo) {

        var link = "http://cloud.opengate.es:25281/v70/provision/organizations/amplia_rd/entities/devices/" + crudInfo.device.id;
        var request = {
            url: link,
            method: "PUT",
            data: crudInfo,
            headers: {
              "X-ApiKey": "925f11cc-2b25-4cc1-a076-6a2df9472e57",
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


/////////////////////////////////////////////////////

    service.sendCrudData = function (crudInfo){

        var link = "http://cloud.opengate.es:25281/v70/provision/organizations/amplia_rd/entities/devices/" + crudInfo.device.id;
        var request = {
            url: link,
            method: "GET",
            headers: {
              "X-ApiKey": "925f11cc-2b25-4cc1-a076-6a2df9472e57",
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
            });
    }

    service.createDeviceDialog = function(crudInfo){

        var confirmPopup = $ionicPopup.confirm({
            title: "Device not found",
            template: "This device isn\"t created yet, do you want to create it with the default data?"
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

    service.fillCrudData = function (){
        crudInfo = {};
      var myPopup = $ionicPopup.show({
        template: "Do you want to use the default data or the cloud data?",
        title: "Fill crud data",
        buttons: [
          { text: "Default",
            type: "button-positive",
            onTap: function(e) {
                crudInfo = service.fillDefaultCrudInfo();
                $cordovaToast.show(JSON.stringify(crudInfo), "long", "center")
            } 
        },
          {
            text: "Cloud",
            type: "button-positive",
            onTap: function(e) {

            }
          }
        ]
      });

      return crudInfo;

    }


    return service;

});