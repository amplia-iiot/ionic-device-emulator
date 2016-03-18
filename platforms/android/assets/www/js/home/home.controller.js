"use strict";

angular.module("starter.home")
.controller("homeController", function(
 $scope
,$rootScope
,$ionicPlatform
,homeService
,$ionicLoading
,services
,$cordovaToast
){
	$rootScope.download = ""

	$rootScope.$watch('download.downloading', function () {
		if ($rootScope.download.downloading){
        $ionicLoading.show({
            template: "<p>Downloading</p><ion-spinner></ion-spinner> <br/> <br/>" 
            	+ " <p href=\"#/app/{{download.progress}}\">{{download.progress}}</p>",
            scope: $rootScope
        });
		}
		else {
	        $ionicLoading.hide();
		}
	});

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
			.catch(function(status){
	            $cordovaToast.show("Cannot fill the device", "short", "center")
	            $cordovaToast.show(status, "long", "center")
			});

	    })
	    .catch(function(){
	     	$cordovaToast.show("error", "short", "center")
	    });

	}; 


})
