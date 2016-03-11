angular.module("starter.controllers", ["ngCordova", "starter.services"])

.controller("appController", function(
 $scope
 ,$ionicModal
 ,$ionicPlatform
 ,services
 ,$cordovaToast
 ) {

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

	function openSocket() {

		if (webSocket !== undefined
				&& webSocket.readyState !== WebSocket.CLOSED) {
	     	$cordovaToast.show("WebSocket is already opened.", "short", "center");
			return;
		}
		
		webSocket = new WebSocket("ws://172.19.18.217:9956/v70/6d7757995310abb2?xHyKZ=2829be88-a7d7-4f51-aefc-3cc2385b6506");

		webSocket.onopen = function(event) {
	     	$cordovaToast.show("Connection open", "short", "center")
	     	console.log("onopen()")
			// For reasons I can't determine, onopen gets called twice
			// and the first time event.data is undefined.
			// Leave a comment if you know the answer.
			if (event.data === undefined)
				return;

	     	console.log(event.data)
		};

		webSocket.onmessage = function(event) {
			if(event.operation.request.name == "UPDATE")
				services.webSocketDialogUpdate(event.operation.request)
			else
				services.webSocketDialog(event.operation.request);
		};

		webSocket.onclose = function(event) {
	     	$cordovaToast.show("Connection closed", "short", "center")
		};
	}

	function closeSocket() {
		webSocket.close();
     	$cordovaToast.show("Closing socket", "short", "center")
	}

})
