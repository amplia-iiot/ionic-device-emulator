angular.module("starter.controllers", ["ngCordova", "starter.services"])

.controller("appController", function($scope, $ionicModal, $ionicPlatform) {

	var webSocket;
	$scope.webSocket = {"checked" : false}

	$scope.enableWebSocket = function (){
		if($scope.webSocket.checked) {
			console.log("enabled");
			openSocket();		
		}
		else {
			console.log("disabled");
			closeSocket();		
		}
	}

	function openSocket() {
		document.cookie = "test=test";
		console.log(document.cookie);
	}

	function closeSocket() {
		webSocket.close();
	}

})
