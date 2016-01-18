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
		service.deleteDeviceDialog();
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
	$scope.iot = {
		"glucoseConcentration": 250, 
		"weight": 54,
		"pulseRate": 42,
		"systolicPresion": 62
	};

	$scope.sendIotData = function(){
		$scope.iotInfo = service.fillDefaultIotInfo($scope.iot);
		service.sendIotInfo($scope.iotInfo);

	}
})

.controller("ConfigCtrl", function($scope, $ionicPlatform, service) {

	$scope.userData = service.getUserData();

})
