angular.module("starter", [
    "ionic"
    ,"starter.controllers"
    ,"starter.services"
    ,"starter.iot"
    ,"starter.home"
    ,"starter.dmm"
    ,"starter.config"
    ,"starter.about"
    ,"starter.operations"
])

.run(function($ionicPlatform, $cordovaSQLite, $rootScope) {
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
    
    db = $cordovaSQLite.openDB({ name: 'my.db' });
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS user (email VARCHAR(50) primary key, host VARCHAR(50), apikey VARCHAR(50), organization VARCHAR(50), channel VARCHAR(50), north_port VARCHAR(10), south_port VARCHAR(10))")
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS operations (id VARCHAR(50) primary key, name VARCHAR(50), timestamp VARCHAR(30))")
    $rootScope.download = {
      "downloading": false,
      "progress": " "
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
