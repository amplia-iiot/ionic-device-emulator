"use strict";

angular.module("starter.home")
.controller("homeController", function(
 $scope
,$ionicPlatform
,homeService
,$cordovaToast
){

	$scope.sendData = function(){
		homeService.sendCrudData($scope.crudInfo);
	}; 

	$scope.deleteDevice = function(){
		homeService.deleteDeviceDialog();
	}; 

	$scope.fillData = function(){

		homeService.fillCrudDialog()
		.then(function(data){
			$scope.crudInfo = data;	
            $cordovaToast.show("Device filled", "short", "center")

		})
		.catch(function(){
            $cordovaToast.show(status, "short", "center")
            $cordovaToast.show("Cannot fill the device", "short", "center")
		});
	}; 

})
