"use strict";

angular.module("starter")
  .config(function($stateProvider) {
    $stateProvider
      .state("app.about", {
      	url: "/about",
    	views: {
      		"menuContent": {
        	templateUrl: "js/about/about.html",
        	controller: "aboutController"
      		}
    	}
      });
  });

