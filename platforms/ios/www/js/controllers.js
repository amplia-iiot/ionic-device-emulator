angular.module("starter.controllers", ["ngCordova", "starter.services"])

.controller("AppCtrl", function($scope, $ionicModal, $timeout, $ionicPlatform) {

})


.controller("HomeCtrl", function($scope, $ionicPlatform, $http,
						service, $ionicPopup, $timeout, $cordovaToast) {



	$scope.fillData = function(){
		service.fillCrudDialog()
		.then(function(data){
			$scope.crudInfo = data;	
		})
		.catch(function(){
			console.log("Error")
		});
	}; 

	$scope.sendData = function(){
		service.sendCrudData($scope.crudInfo);
	}; 

	$scope.deleteDevice = function(){
		service.deleteDevice($scope.crudInfo);
	}; 

})


.controller("DmmCtrl", function($scope, $ionicPlatform, $http, $cordovaGeolocation, service) {

	$scope.refreshData = function(){
		$scope.dmmInfo = service.fillDefaultDmmInfo();
	}; 

	$scope.updateData = function(){
		$scope.dmmInfo = service.fillDefaultDmmInfo();
		service.postDmmData($scope.dmmInfo);
	  
	}; 

})


.controller("IotCtrl", function($scope, $ionicPlatform, service) {

	$scope.updateData = function(){
		//service.sendIotInfo($scope.iotInfo);
		$scope.iotInfo = service.fillDefaultIotInfo();
		$cordovaToast.show(JSON.stringify(iotInfo), "long", "center");

	}
})

.controller("ConfigCtrl", function($scope, $ionicPlatform, service) {

	$scope.userData = service.getUserData();

})
