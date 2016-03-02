"use strict";

angular.module("starter")
  .config(function($stateProvider) {
    $stateProvider
      .state("app.iot", {
      	url: "/iot",
    	views: {
      		"menuContent": {
        	templateUrl: "js/iot/iot.html",
        	controller: "iotController"
      		}
    	}
      });
  });

