angular.module("starter.iot")

.factory("iotService", function (
     $http
    ,$cordovaToast
    ,$q
    ,$ionicLoading,
    opengate) {

    userData = {};
    service = {};
    apiR =  undefined;

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
        try {
            show($ionicLoading);
            apiR = opengate.api(userData);
            var message = apiR().deviceMessageBuilder();
            message.withDataStreamVersion(iotInfo.version);

            for (let i = 0; i < iotInfo.datastreams.length; i++) {
                let datastream = iotInfo.datastreams[i];
                let datastreamMessage = apiR().datastreamBuilder();
                datastreamMessage.withId(datastream.id).withFeed(datastream.feed);
                for (let j = 0; j < datastream.datapoints.length; j++) {
                    let datapoint = datastream.datapoints[j];
                    let datapointsMessage = apiR().datapointsBuilder();
                    datapointsMessage.withAt(datapoint.at).withValue(datapoint.value);
                    datastreamMessage.withDatapoint(datapointsMessage);
                }
                message.withDataStream(datastreamMessage);
                $cordovaToast.show(JSON.stringify(message), "short", "center")
            }
            message.withId(userData.entityKey);
            message.create()
            .then(function(data){
                $cordovaToast.show("created", "short", "center")
            })
            .catch(function(error){
                $cordovaToast.show("error", "short", "center")
                $cordovaToast.show(error, "short", "center")
            })
           .finally(function() {
                
            });
       }
       catch(err){
            hide($ionicLoading);
       }
    }

    return service;

});