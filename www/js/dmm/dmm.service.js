angular.module("starter.dmm")

.factory("dmmService", function(
    $http, $cordovaToast, $q, $ionicLoading, $timeout, opengate
) {

    userData = {};
    service = {};
    apiR = undefined;

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


    service.fillDefaultDmmInfo = function() {

        var date = new Date().getTime();

        dmmInfo = {
            "version": "1.0.0",
            "event": {
                "id": new Date().toISOString(),
                "device": {
                    "name": device.model,
                    "description": "device ",
                    "hardware": {
                        "serialnumber": device.serial,
                        "manufacturer": {
                            "name": device.manufacturer,
                            "oui": "41-B9-72"
                        },
                        "model": {
                            "name": device.model
                        }
                    },
                    "softwareList": [{
                        "name": "BloodPressure",
                        "type": "FIRMWARE",
                        "version": "1.0",
                        "date": new Date().toISOString()
                    }],
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
                    "communicationsModules": [{
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
                    }]
                }
            }

        };

        return dmmInfo;

    }


    service.postDmmData = function(dmmInfo, userData) {
        try {
        show($ionicLoading);
        var date = new Date().getTime();
        apiR = opengate.api(userData);
        var message = apiR().deviceMessageBuilder().withDmmVersion(dmmInfo.version).withEventId(dmmInfo.event.id);
            message.withDeviceId(userData.entityKey)
            .withEventName(dmmInfo.event.device.name)
            .withEventDescription(dmmInfo.event.device.description);
        $cordovaToast.show("message created ", "short", "center")

        var hardware = apiR().hardwareMessageBuilder().withSerialnumber(device.uuid)
            .withManufacturerName(dmmInfo.event.device.hardware.manufacturer.name)
            .withManufacturerOui(dmmInfo.event.device.hardware.manufacturer.oui)
            .withModelName(dmmInfo.event.device.hardware.model.name);
        message.withHardware(hardware);
        $cordovaToast.show("hrdware created ", "short", "center")
        for (let i = 0; i < dmmInfo.event.device.softwareList.length; i++) {
            softwareInfo = dmmInfo.event.device.softwareList[i];
            software = apiR().softwareMessageBuilder().withName(softwareInfo.name).withType(softwareInfo.type)
                .withVersion(softwareInfo.version).withDate(softwareInfo.date);
            message.withSoftware(software);
        }
        $cordovaToast.show("softwareList created ", "short", "center")
        


        message.withOperationalStatus(dmmInfo.event.device.operationalStatus)
            .withDateLocation(dmmInfo.event.device.location.timestamp)
            .withLatitude(dmmInfo.event.device.location.coordinates.latitude)
            .withLongitude(dmmInfo.event.device.location.coordinates.longitude)
            .withCurrentTemperature(dmmInfo.event.device.temperature.current)
            .withUnitTemperature(dmmInfo.event.device.temperature.unit)
            .withStatusTemperature(dmmInfo.event.device.temperature.status)
            .withTrendTemperature(dmmInfo.event.device.temperature.trend)
            .withTemperatureAverage(dmmInfo.event.device.temperature.average)
            .withMinimumTemperature(dmmInfo.event.device.temperature.minimum)
            .withMaximumTemperature(dmmInfo.event.device.temperature.maximum);

            $cordovaToast.show("temperature updated ", "short", "center")
        var powerSupply = apiR().powerSupplyMessageBuilder()
            .withSource(dmmInfo.event.device.powerSupply.source)
            .withStatus(dmmInfo.event.device.powerSupply.status)
            .withBatteryChargeLevelTrend(dmmInfo.event.device.powerSupply.batteryChargeLevel.trend)
            .withBatteryChargeLevelStatus(dmmInfo.event.device.powerSupply.batteryChargeLevel.status)
            .withBatteryChargeLevelPercentage(dmmInfo.event.device.powerSupply.batteryChargeLevel.percentage);
        message.withPowerSupply(powerSupply);
$cordovaToast.show("powerSupply updated ", "short", "center")
        for (let i = 0; i < dmmInfo.event.device.communicationsModules.length; i++) {
            cMInfo = dmmInfo.event.device.communicationsModules[i];
            var hardwareCM = apiR().hardwareMessageBuilder()
                .withSerialnumber(cMInfo.hardware.serialnumber)
                .withManufacturerName(cMInfo.hardware.manufacturer.name)
                .withManufacturerOui(cMInfo.hardware.manufacturer.oui)
                .withModelName(cMInfo.hardware.model.name);

            var subscription = apiR().subscriptionMessageBuilder()
                .withName(cMInfo.subscription.name)
                .withDescription(cMInfo.subscription.description);

            var commsModule = apiR().commsModuleMessageMessageBuilder();
            commsModule.withName(cMInfo.name).withType(cMInfo.type)
                .withHardware(hardwareCM).withSubscription(subscription);

            message.withCommsModule(commsModule);
        }



        message.withId(userData.entityKey);

        message.create()
            .then(function(data) {
                $cordovaToast.show("Device updated ", "short", "center")
            })
            .catch(function(error) {
                $cordovaToast.show("Cannot update the device", "short", "center")
                $cordovaToast.show(error, "long", "center")
            })
            .finally(function() {
                hide($ionicLoading);
            });
        }
        catch(err){
            $cordovaToast.show(err, "long", "center")
            hide($ionicLoading);
        }


    }

    return service;

});