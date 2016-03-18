angular.module("starter.controllers", ["ngCordova", "starter.services"])

.controller("appController", function(
  $scope
 ,$rootScope
 ,$ionicLoading
 ,$ionicPlatform
){

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


})
