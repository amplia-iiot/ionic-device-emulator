"use strict";

angular.module("starter.config")
.controller("configController", function($scope, $ionicPlatform, configService, services, $cordovaBarcodeScanner, $cordovaToast) {
   


	function init(){
    configService.createDb();
 		services.getData()
    .then(function(data){
      $scope.userData = data;
    })
    .catch(function(){
      console.log("Error")
      $cordovaToast.show("error", "long", "center")

    });

    $ionicPlatform.ready(function() {
      $scope.deviceid = device.uuid ;
    });
	}


  $scope.scan = function(){

   $ionicPlatform.ready(function() {
        $cordovaBarcodeScanner
        .scan()
        .then(function(result) {

          var qrString = result.text;

          var qrJson = JSON.parse(qrString);
          
	        configService.createUser(qrString);
          $scope.userData = qrJson;
  			  $scope.deviceid = device.uuid;

        }, function(error) { });
    });
    $scope.scanResults = "";

  };


    init();

})
