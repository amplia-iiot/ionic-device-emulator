angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPlatform) {

})


.controller('HomeCtrl', function($scope, $ionicPlatform,
     $http, $cordovaBarcodeScanner, dmm) {
   

//QR SCANNER
  $scope.scan = function(){
    $ionicPlatform.ready(function() {
        $cordovaBarcodeScanner
        .scan()
        .then(function(result) {

          var qrString = result.text;
          $scope.qr = qrString;

          var qrJson = JSON.parse(qrString);
          
          $scope.email = qrJson.email;
          $scope.apikey = qrJson.apikey;
          $scope.channels = qrJson.channels;
          $scope.organization = qrJson.organization;


        }, function(error) {


        });
    });
    $scope.scanResults = '';
  };

  $ionicPlatform.ready(function(){
    $scope.id = device.uuid;
    $scope.customID = device.uuid;
    $scope.template = "default";
    $scope.type = "gateway";
    $scope.specificType = "CONCENTRATOR";
    $scope.name = "default";
    $scope.description = "Device for testing purposes";
    
    $scope.organization = "amplia_rd";
    $scope.channel = "default_channel";
    $scope.administrativeState = "ACTIVE";
    $scope.serviceGroup = "emptyServiceGroup";



  })

})


.controller('DmmCtrl', function($scope, $ionicPlatform) {


  $ionicPlatform.ready(function(){

    getDmmInfo();
    /*
    $scope.id = device.uuid;
    $scope.deviceName = "Virtual device"
    $scope.description = "Virtual device for testing";
    
    $scope.serialNumber = device.uuid;;
    $scope.manufacturer = "amplia)))";
    $scope.manufacturerOUI = "41-B9-72";
    $scope.model = "BloodPresure";
    
    $scope.softwareName = "BloodPresure";
    $scope.type = "FIRMWARE";
    $scope.version = "1.0";
    $scope.date = "2012-09-11T13:02:41Z";

    $scope.specificType = "METER";

    var date = new Date();
    $scope.timestamp = date.toDateString();
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
    $scope.communicationserialNumber = device.uuid;
    $scope.communicationManufacturer = "amplia)))";
    $scope.communicationManufacturerOUI = "41-B9-72";
    $scope.communicationModel = "ABT";
    $scope.subscriptionName = "bluetooth_network";
    $scope.subscriptionDescription = "Bluetooth Network";

*/


  })

})


.controller('IotCtrl', function($scope, $ionicPlatform) {
/*  $scope.data = {glucoseConcentration: 20}

  $scope.getGlucoseConcentration = function(rangeValue){
    if($scope.glucoseConcentration< 20){
      $scope.text = "+50";
    }
    else {
      $scope.text = "-50";}
  }*/

})
