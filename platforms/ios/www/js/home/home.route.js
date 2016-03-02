"use strict";

angular.module("starter")
  .config(function($stateProvider) {
    $stateProvider
      .state("app.home", {
      	url: "/home",
    	views: {
      		"menuContent": {
        	templateUrl: "js/home/home.html",
        	controller: "homeController"
      		}
    	}
      });
  });

