"use strict";

angular.module("starter")
  .config(function($stateProvider) {
    $stateProvider
      .state("app.config", {
      	url: "/config",
    	views: {
      		"menuContent": {
        	templateUrl: "js/config/config.html",
        	controller: "configController"
      		}
    	}
      });
  });

