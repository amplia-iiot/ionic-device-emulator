angular.module('starter.controllers', ['ngCordova', 'starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPlatform) {

})


.controller('HomeCtrl', function($scope, $ionicPlatform,
     $http, $cordovaBarcodeScanner) {
   

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


.controller('DmmCtrl', function($scope, $ionicPlatform, dmm) {
  $ionicPlatform.ready(function(){
    $scope.dmmInfo = dmm.getDmmInfo();
    console.log(JSON.stringify($scope.dmmInfo, null, 2));
  });
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
