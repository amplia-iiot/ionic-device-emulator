"use strict";

angular.module("starter.iot")
.controller("iotController", function($scope, $ionicPlatform, iotService, services) {
	$scope.iot = {
		"glucoseConcentration": 250, 
		"weight": 54,
		"pulseRate": 42,
		"systolicPresion": 62
	};

	$scope.sendIotData = function(){
		$scope.iotInfo = iotService.fillDefaultIotInfo($scope.iot)
		services.getData()
	    .then(function(data){
	    	$scope.userData = data;
	    	$cordovaToast.show(userData, "long", "center")

	    })
	    .catch(function(){
	     	$cordovaToast.show("error", "long", "center")
	    });

		iotService.sendIotInfo($scope.iotInfo, $scope.userData);

	}
})
