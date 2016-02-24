"use strict";

angular.module("starter.iot")
.controller("iotController", function(
 $scope
,$ionicPlatform
,iotService
,services
) {

	$scope.iot = {
		"glucoseConcentration": 100, 
		"weight": 65,
		"pulseRate": 90,
		"systolicPresion": 115
	};

	$scope.sendIotData = function(){
		$scope.iotInfo = iotService.fillDefaultIotInfo($scope.iot)

	    services.getData()
	    .then(function(data){
	    	$scope.userData = data;
	    	$cordovaToast.show($scope.userData, "short", "center")
	    })
	    .catch(function(){
	     	$cordovaToast.show("error", "short", "center")
	    });

		iotService.sendIotInfo($scope.iotInfo, $scope.userData);

	}
})
