angular.module("starter.controllers", ["ngCordova", "starter.services"])

.controller("AppCtrl", function($scope, $ionicModal, $timeout, $ionicPlatform) {

})


.controller("HomeCtrl", function($scope, $ionicPlatform, $http, $cordovaBarcodeScanner,
						service, $ionicPopup, $timeout, $cordovaToast) {

	$ionicPlatform.ready(function(){
		//$scope.crudInfo = service.fillDefaultCrudInfo();

	})

	$scope.fillData = function(){
		$scope.crudInfo = service.fillCrudData();
	}; 

	$scope.sendData = function(){
		service.sendCrudData($scope.crudInfo);
	}; 

	$scope.deleteDevice = function(){

	}; 


})


.controller("DmmCtrl", function($scope, $ionicPlatform, $http, service) {

	$ionicPlatform.ready(function(){
		$scope.dmmInfo = service.fillDefaultDmmInfo();
	});
})

.controller("IotCtrl", function($scope, $ionicPlatform) {

})
