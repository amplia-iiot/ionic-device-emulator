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
		// Ensures only one connection is open at a time
		if (webSocket !== undefined
				&& webSocket.readyState !== WebSocket.CLOSED) {
			console.log("WebSocket is already opened.");
			return;
		}
		// Create a new instance of the websocket
		webSocket = new WebSocket("ws://localhost:25281/v70/device1");

		var myDate = new Date()
		myDate.setMonth(myDate.getMonth() + 12);

		document.cookie = "X-Api-Key=2829be88-a7d7-4f51-aefc-3cc2385b6506" +
				";expires=" + myDate + ";domain=.cloud.opengate.com;path=/";

		// TODO Insert in Cookies: "X-Api-Key"- "2829be88-a7d7-4f51-aefc-3cc2385b6506"

		/**
		 * Binds functions to the listeners for the websocket.
		 */
		webSocket.onopen = function(event) {
			// For reasons I can't determine, onopen gets called twice
			// and the first time event.data is undefined.
			// Leave a comment if you know the answer.
			if (event.data === undefined)
				return;

			console.log(event.data);
		};

		webSocket.onmessage = function(event) {
			console.log(event.data);
		};

		webSocket.onclose = function(event) {
			console.log("Connection closed");
		};
	}

	function closeSocket() {
		webSocket.close();
	}

})
