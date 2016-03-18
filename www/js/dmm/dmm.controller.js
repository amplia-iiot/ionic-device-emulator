"use strict";

angular.module("starter.dmm")
.controller("dmmController", function(
   $scope
  ,$rootScope
  ,$ionicLoading
  ,$ionicPlatform
  ,dmmService
  ,$cordovaToast
  ,services) {

  $rootScope.download = ""
  
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

  $scope.refreshData = function(){
    $scope.dmmInfo = dmmService.fillDefaultDmmInfo();
  }; 

  $scope.updateData = function(){
    //$scope.dmmInfo = dmmService.fillDefaultDmmInfo();
    
    $scope.dmmInfo.event.device.softwareList[0].date = new Date().toISOString();
    $scope.dmmInfo.event.device.location.timestamp = new Date().toISOString();
    $scope.dmmInfo.event.id = new Date().getTime();

  	services.getData()
      .then(function(data){
      	$scope.userData = data;
        dmmService.postDmmData($scope.dmmInfo, $scope.userData);
      })
      .catch(function(){
        $cordovaToast.show("error", "short", "center")
      });

  }; 

})
