"use strict";

angular.module("starter")
  .config(function($stateProvider) {
    $stateProvider
      .state("app.dmm", {
      	url: "/dmm",
    	views: {
      		"menuContent": {
        	templateUrl: "js/dmm/dmm.html",
        	controller: "dmmController"
      		}
    	}
      });
  });

