"use strict";

angular.module("starter.dmm")
.controller("dmmController", function($scope, $ionicPlatform, $http, dmmService, services) {

  $scope.refreshData = function(){
    $scope.dmmInfo = dmmService.fillDefaultDmmInfo();
  }; 

  $scope.updateData = function(){
    $scope.dmmInfo = dmmService.fillDefaultDmmInfo();


	services.getData()
    .then(function(data){
    	$scope.userData = data;
    	$cordovaToast.show(userData, "long", "center")

    })
    .catch(function(){
      $cordovaToast.show("error", "long", "center")
    });

    dmmService.postDmmData($scope.dmmInfo, $scope.userData);
  }; 

})
