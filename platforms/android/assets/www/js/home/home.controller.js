"use strict";

angular.module("starter.home")
.controller("homeController", function(
 $scope
,$ionicPlatform
,homeService
,services
,$cordovaToast
){

	$scope.sendData = function(){
	    services.getData()
	    .then(function(data){
	    	$scope.userData = data;
		homeService.sendCrudData($scope.crudInfo, data);
	    })
	    .catch(function(){
	     	$cordovaToast.show("error", "short", "center")
	    });


	}; 

	$scope.deleteDevice = function(){
	    services.getData()
	    .then(function(data){
	    	$scope.userData = data;
			homeService.deleteDeviceDialog(data);
	    })
	    .catch(function(){
	     	$cordovaToast.show("error", "short", "center")
	    });
	}; 

	$scope.fillData = function(){

		services.getData()
	    .then(function(userdata){

			homeService.fillCrudDialog(userdata)
			.then(function(cruddata){
				$scope.crudInfo = cruddata;	
	            $cordovaToast.show("Device filled", "short", "center")
			})
			.catch(function(){
	            $cordovaToast.show("Cannot fill the device", "short", "center")
	            $cordovaToast.show(status, "long", "center")
			});

	    })
	    .catch(function(){
	     	$cordovaToast.show("error", "short", "center")
	    });

	}; 

})
