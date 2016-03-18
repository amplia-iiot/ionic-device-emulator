"use strict";

angular.module("starter.iot")
.controller("iotController", function(
 $scope
,$rootScope
,$ionicLoading
,$ionicPlatform
,iotService
,services
) {

  	$rootScope.download = ""
	
	$rootScope.$watch('download.downloading', function () {
		if ($rootScope.download.downloading){
        $ionicLoading.show({
            template: "<p>Downloading</p><ion-spinner></ion-spinner> <br/> <br/>" 
            	+ " <p href=\"#/app/{{$root.download.progress}}\">{{$root.download.progress}}</p>",
            scope: $scope
        });
		}
		else {
	        $ionicLoading.hide();
		}
	});

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
			iotService.sendIotInfo($scope.iotInfo, $scope.userData);
	    })
	    .catch(function(){
	     	$cordovaToast.show("error", "short", "center")
	    });


	}
})
