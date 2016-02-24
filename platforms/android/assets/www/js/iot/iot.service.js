angular.module("starter.iot")

.factory("iotService", function (
     $http
    ,$cordovaToast
    ,$q
    ,$ionicLoading) {

    userData = {};
    service = {};

    function show() {
        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>'
        });
    };

    function hide(){
        $ionicLoading.hide();
    };

    service.fillDefaultIotInfo = function (iot) {
        var time = new Date().getTime();
        var times = time/1000;
        var date = Math.round(times);

        iotInfo = {
            "version": "1.0.0",
            "datastreams": [
                {
                    "id": "health.glucose.concentration",
                    "feed": "health",
                    "datapoints": [
                        {"at": date, "value": iot.glucoseConcentration}
                    ]
                },
                {
                    "id": "health.bodycomposition.weight",
                    "feed": "health",
                    "datapoints": [
                        {"at": date, "value": iot.weight}
                    ]
                },
                {
                    "id": "health.bloodpresure.pulserate",
                    "feed": "health",
                    "datapoints": [
                        {"at": date, "value": iot.pulseRate}
                    ]
                },
                {
                    "id": "health.bloodpresure.systolic",
                    "feed": "health",
                    "datapoints": [
                        {"at": date, "value": iot.systolicPresion}
                    ]
                }
            ]
        }

        return iotInfo;
    }


    service.sendIotInfo = function (iotInfo, userData){

        var link = "http://" + userData.host + ":" + userData.south_port 
            + "/v70/devices/" + device.uuid + "/collect/iot";
            console.log(link);

        var request = {
            url: link,
            method: "POST",
            data: iotInfo,
            headers: {
              "X-ApiKey": userData.apikey,
              "Content-Type": "application/json"
            }
        };

        show($ionicLoading);

        $http(request)
            .success(function (data, status, headers, config){
                $cordovaToast.show("Device updated", "short", "center");
            })
            .error(function (data, status, headers, config){
                $cordovaToast.show("Cannot update the device", "short", "center");
                $cordovaToast.show(status, "short", "center");
            })
            .finally(function($ionicLoading) { 
              hide($ionicLoading);  
            });
    }

    return service;

});