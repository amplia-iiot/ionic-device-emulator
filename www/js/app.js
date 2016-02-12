angular.module("starter", [
    "ionic"
    ,"starter.controllers"
    ,"starter.services"
    ,"starter.iot"
    ,"starter.home"
    ,"starter.dmm"
    ,"starter.config"

])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });

})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $stateProvider

    .state("app", {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: "appController"
  })

    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise("/app/config");
});
