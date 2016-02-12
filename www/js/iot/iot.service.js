angular.module("starter.iot")

.factory("iotService", function ($http, $cordovaToast, $q, $ionicPopup, $timeout, $cordovaBarcodeScanner) {
    userData = {};
    service = {};


    service.fillDefaultIotInfo = function (iot) {
        var time = new Date().getTime();
        iotInfo = {
        "version": "1.0.0",
        "datastreams": [
            {
                "id": "health.glucose.concentration",
                "feed": "health",
                "datapoints": [
                    {"at": time, "value": iot.glucoseConcentration}
                ]
            },
            {
                "id": "health.bodycomposition.weight",
                "feed": "health",
                "datapoints": [
                    {"at": time, "value": iot.weight}
                ]
            },
            {
                "id": "health.bloodpresure.pulserate",
                "feed": "health",
                "datapoints": [
                    {"at": time, "value": iot.pulseRate}
                ]
            },
            {
                "id": "health.bloodpresure.systolic",
                "feed": "health",
                "datapoints": [
                    {"at": time, "value": iot.systolicPresion}
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
        $http(request)
            .success(function (data, status, headers, config){
                $cordovaToast.show("IoT data sent", "long", "center");
            })
            .error(function (data, status, headers, config){
                $cordovaToast.show("Cannot send the IoT data", "long", "center");
                $cordovaToast.show(status, "long", "center");
            });
    }


    return service;

});