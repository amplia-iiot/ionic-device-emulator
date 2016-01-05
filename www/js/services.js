angular.module('starter.services', ['ngCordova'])

.factory('dmm', function ($http) {

    function guid() {
        function _p8(s) {
            var p = (Math.random().toString(16)+"000000000").substr(2,8);
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    }

    service = {};
    service.getDmmInfo = function () {

        dmmInfo = {
            "event": {
                "id": new Date().getTime(),
                "device": {
                    "id": "device.uuid",
                    "name": "Virtual Device",
                    "description": "Virtual Device for Testing",
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

    service.postDmmInfo = function (dmmInfo) {


    }

    service.postIotInfo = function (iotInfo){

    }

    return service;
});