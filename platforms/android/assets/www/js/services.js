angular.module("starter.services", ["ngCordova"])

.factory("services", function ($http, $cordovaToast, $q, $ionicPopup, $timeout, $cordovaBarcodeScanner) {
    userData = {};
    service = {};


    service.getData = function (){

        var defered = $q.defer();
        var promise = defered.promise;

        var mydb = openDatabase("user_db", "0.1", "Database with the user data", 1024 * 1024);

        if (mydb) {
            mydb.transaction(function (t) {
                t.executeSql("SELECT * FROM users", [], function (transaction, results) {
                    var i;

                    for (i = 0; i < results.rows.length; i++) {
                        var row = results.rows.item(i);
                            var userData = {
                                "email": row.email,
                                "apikey": row.apikey,
                                "channel": row.channel,
                                "organization": row.organization,
                                "host": row.host,
                                "north_port": row.north_port,
                                "south_port": row.south_port,
                            };
                            defered.resolve(userData);
                    }
                });
            });

        } else {
            var msg = "db not found, your browser does not support web sql!";
            $cordovaToast.show(msg, "long", "center")
            defered.reject(msg);
        }
        return promise;
    }

    return service;

});