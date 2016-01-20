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

.controller("ConfigCtrl", function($scope, $ionicPlatform, service, $cordovaBarcodeScanner) {

	//$scope.userData = service.getUserData();

  $scope.scan = function(){
    $ionicPlatform.ready(function() {
        $cordovaBarcodeScanner
        .scan()
        .then(function(result) {

          var qrString = result.text;

          var qrJson = JSON.parse(qrString);
	          
	        $scope.userData = {
	            "email": qrJson.email,
	            "apikey": qrJson.apikey,
	            "channels": qrJson.channels,
	            "organization": qrJson.organization,
	            "opengate_host": qrJson.opengate_host,
	            "north_port": qrJson.north_port,
	            "south_port": qrJson.south_port,
	            "id": device.uuid
	            //"id": qrJson.id
	        };        

        }, function(error) { });
    });
    $scope.scanResults = "";
  };


})
