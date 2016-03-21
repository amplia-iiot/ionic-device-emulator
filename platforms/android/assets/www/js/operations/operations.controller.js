"use strict";

angular.module("starter.operations")

.controller("operationsController", function(
  $scope
 ,$rootScope
 ,$ionicModal
 ,$ionicPlatform
 ,operationsService
 ,$ionicPopup
 ,$cordovaToast
 ,$cordovaFileTransfer
 ,$ionicLoading
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

			if(data.operation.request.name == "UPDATE"){
				operationsService.webSocketDialogUpdate(data)
				.then(function(downloadUrl){
		            
		            var filename = downloadUrl.split("/").pop();
		            var targetPath = cordova.file.externalDataDirectory + filename;
		            var trustHosts = true;
		            var options = {};
		            options.headers = {'X-ApiKey': "2829be88-a7d7-4f51-aefc-3cc2385b6506" };

					$cordovaFileTransfer.download(downloadUrl, targetPath, options, trustHosts)
		              .then(function(result) {
		                $cordovaToast.show("Download finished", "short", "center")
			            	$rootScope.download.downloading = false;
			            }, function(err) {
			                $cordovaToast.show("Cant\'t download the file", "short", "center")
			            	$rootScope.download.downloading = false;

			            }, function (progress) {
							$rootScope.download = {
								"downloading": true,
								"progress": Math.floor(progress.loaded / progress.total * 100) + "%"
							}
		            	});
				})
			}
			else {
				operationsService.webSocketDialog(data);
			}

			operationsService.saveOperation(data);
		};


		webSocket.onclose = function(event) {
	     	$cordovaToast.show("Connection closed", "short", "center")
		};
	}

	function closeSocket() {
		webSocket.close();
	}

  	$rootScope.download = ""

	$rootScope.$watch('download.downloading', function () {
		if ($rootScope.download.downloading){
	        $ionicLoading.show({
	            template: "<p>Downloading</p><ion-spinner></ion-spinner> <br/> <br/>" 
	            	+ " <p href=\"#/app/{{$root.download.progress}}\">{{$root.download.progress}}</p>"
	        });
		}
		else {
	        $ionicLoading.hide();
		}
	});


})