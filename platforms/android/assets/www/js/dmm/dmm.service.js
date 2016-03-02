angular.module("starter.dmm")

.factory("dmmService", function (
     $http
    ,$cordovaToast
    ,$q
    ,$ionicLoading
    ,$timeout
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
    

    service.fillDefaultDmmInfo = function () {
        var date = new Date().getTime();

        dmmInfo = {
            "event": {
                "id": date,
                "device": {
                    "id": device.uuid,
                    "name": device.model,
                    "description": "Virtual Device",
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
                            "date": new Date().toISOString()
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


    service.postDmmData = function (dmmInfo, userData) {

        var link = "http://" + userData.host + ":" + userData.south_port 
            + "/v70/devices/" + device.uuid + "/collect/dmm";

        var request = {
            url: link,
            method: "POST",
            data: dmmInfo,
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

    return service;

});