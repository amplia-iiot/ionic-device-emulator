angular.module('starter.services', ['ngCordova'])

.factory('dmm', function ($http) {
	service = {};


	service.getDmmInfo = function ($scope, $ionicPlatform) {

    //$scope.id = device.uuid;
    $scope.deviceName = "Virtual device"
    $scope.description = "Virtual device for testing";
    
    //$scope.serialNumber = device.uuid;;
    $scope.manufacturer = "amplia)))";
    $scope.manufacturerOUI = "41-B9-72";
    $scope.model = "BloodPresure";
    
    $scope.softwareName = "BloodPresure";
    $scope.type = "FIRMWARE";
    $scope.version = "1.0";
    $scope.date = "2012-09-11T13:02:41Z";

    $scope.specificType = "METER";

    //var date = new Date();
    //$scope.timestamp = date.toDateString();
    $scope.latitude = "42.41677";
    $scope.longitude = "-3.7028";

    $scope.unit = "C";
    $scope.current = "33";
    $scope.tempStatus = "NORMAL";
    $scope.tempTrend = "DECREASING";
    $scope.average = "20";
    $scope.maximum = "25";
    $scope.minimum = "15";

    $scope.operationalStatus = "UP";

    $scope.source = "BATTERY";
    $scope.powerStatus = "NORMAL";
    $scope.powerTrend = "EMPTY";
    $scope.batteryStatus = "CHARGED";
    $scope.percentage = "50";

    $scope.name = "Bluetooth Module";
    $scope.communicationType = "Bluetooth";
    //$scope.communicationserialNumber = device.uuid;
    $scope.communicationManufacturer = "amplia)))";
    $scope.communicationManufacturerOUI = "41-B9-72";
    $scope.communicationModel = "ABT";
    $scope.subscriptionName = "bluetooth_network";
    $scope.subscriptionDescription = "Bluetooth Network";

	}

	service.postDmmInfo = function (dmmInfo) {


	}

	service.postIotInfo = function (iotInfo){

	}

	return service;
});