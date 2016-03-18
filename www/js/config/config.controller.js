"use strict";

angular.module("starter.config")
.controller("configController", function(
   $scope
  ,$rootScope
  ,$ionicLoading
  ,$ionicPlatform
  ,configService
  ,services
  ,$cordovaBarcodeScanner
  ,$cordovaToast) {
   
  $rootScope.download;
  
  
  $rootScope.$watch('download.downloading', function () {
    if ($rootScope.download.downloading){
        $ionicLoading.show({
            template: "<p>Downloading</p><ion-spinner></ion-spinner> <br/> <br/>" 
              + " <p href=\"#/app/{{$root.download.progress}}\">{{$root.download.progress}}</p>",
            scope: $rootScope
        });
    }
    else {
          $ionicLoading.hide();
    }
  });

	function init(){
    
    $ionicPlatform.ready(function() {
      $scope.deviceid = device.uuid ;

      services.getData()
      .then(function(data){
        $scope.userData = data;
      })
      .catch(function(){
        $cordovaToast.show("error", "short", "center")
      });
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
