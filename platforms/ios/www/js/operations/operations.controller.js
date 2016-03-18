"use strict";

angular.module("starter.operations")

.controller("operationsController", function(
  $scope
 ,$ionicModal
 ,$ionicPlatform
 ,operationsService
 ,$cordovaToast
 ){

	var webSocket;
	$scope.webSocket = {"checked" : false}

	$scope.enableWebSocket = function (){
		if($scope.webSocket.checked) {
			openSocket();
		}
		else {
			closeSocket();		
		}
	}

	$scope.eraseDatabase = function (){
		operationsService.eraseDatabaseDialog();
	}

	function openSocket() {

		if (webSocket !== undefined
				&& webSocket.readyState !== WebSocket.CLOSED) {
	     	$cordovaToast.show("WebSocket is already opened.", "short", "center");
			return;
		}
		
		webSocket = new WebSocket("ws://192.168.1.163:9956/v70/"
			+ "6d7757995310abb2?xHyKZ=2829be88-a7d7-4f51-aefc-3cc2385b6506");

		webSocket.onopen = function(event) {
	     	$cordovaToast.show("Connection open", "short", "center")
			// For reasons I can't determine, onopen gets called twice
			// and the first time event.data is undefined.
			// Leave a comment if you know the answer.
			if (event.data === undefined)
				return;

	     	console.log(event.data)
		};

		webSocket.onmessage = function(event) {
    		var data = JSON.parse(event.data)

			if(data.operation.request.name == "UPDATE")
				operationsService.webSocketDialogUpdate(data)
			else
				operationsService.webSocketDialog(data);

			operationsService.saveOperation(data);
		};

		webSocket.onclose = function(event) {
	     	$cordovaToast.show("Connection closed", "short", "center")
		};
	}

	function closeSocket() {
		webSocket.close();
	}

})
