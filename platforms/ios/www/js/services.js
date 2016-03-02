angular.module("starter.services", ["ngCordova"])

.factory("services", function ($http
    ,$cordovaToast
    ,$q
    ,$ionicPopup
    ,$timeout
    ,$cordovaSQLite
    ,$cordovaBarcodeScanner
    ) {

    userData = {};
    service = {};

    service.getData = function (){

        var defered = $q.defer();
        var promise = defered.promise;
        
        var db = $cordovaSQLite.openDB({ name: 'my.db' });

        var query = "SELECT * FROM user";
        $cordovaSQLite.execute(db,query,[]).then(function(result) {

            var row = result.rows.item(0).email;

            var userData = {
                "email": result.rows.item(0).email,
                "apikey": result.rows.item(0).apikey,
                "channel": result.rows.item(0).channel,
                "organization": result.rows.item(0).organization,
                "host": result.rows.item(0).host,
                "north_port": result.rows.item(0).north_port,
                "south_port": result.rows.item(0).south_port
            };
            $cordovaToast.show(userData, "short", "center")

            defered.resolve(userData);

        }, function(error) {
            var msg = "error in db";
            defered.reject(msg);
        });

        return promise;
    }

    return service;
});