"use strict";

angular.module("starter")
  .config(function($stateProvider) {
    $stateProvider
      .state("app.operations", {
      	url: "/operations",
        views: {
      		"menuContent": {
        	templateUrl: "js/operations/operations.html",
        	controller: "operationsController"
      		}
    	}
      });
  });

