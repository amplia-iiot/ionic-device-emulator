"use strict";

angular.module("starter.home")
.controller("homeController", function($scope, $ionicPlatform, $http,
						homeService, $ionicPopup, $timeout, $cordovaToast) {


	$scope.fillData = function(){
		homeService.fillCrudDialog()
		.then(function(data){
			$scope.crudInfo = data;	
		})
		.catch(function(){
			console.log("Error")
		});
	}; 

	$scope.sendData = function(){
		homeService.sendCrudData($scope.crudInfo);
	}; 

	$scope.deleteDevice = function(){
		homeService.deleteDeviceDialog();
	}; 

})
