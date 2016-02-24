angular.module("starter.config")

.factory("configService", function (
     $http
    ,$cordovaToast
    ,$q
    ) {

    userData = {};
    service = {};


    service.createDb = function(){

        if (window.openDatabase) {
            var mydb = openDatabase("user_db", "0.1", "Database with the user data", 1024 * 1024);

            mydb.transaction(function (t) {
                t.executeSql("CREATE TABLE IF NOT EXISTS users (email TEXT, host TEXT, apikey TEXT, organization TEXT, channel TEXT, north_port TEXT, south_port TEXT, PRIMARY KEY(email, host))");

            });

        } else {
            $cordovaToast.show("Table not created ", "short", "center")
        }


    }

    service.createUser = function(qrCode){
        var userData = JSON.parse(qrCode);

        if (typeof userData.email !== "undefined"){
            if (window.openDatabase) {
                var mydb = openDatabase("user_db", "0.1", "Database with the user data", 1024 * 1024);
            } else {
                $cordovaToast.show("Table not created ", "short", "center")
            }

            if (mydb) {
                mydb.transaction(function (t) {

                    t.executeSql("INSERT INTO users (email, host, apikey, organization, channel, north_port, south_port) VALUES(?, ?, ?, ?, ?, ?, ?)",
                     [
                        userData.email,
                        userData.host,
                        userData.apikey,
                        userData.organization,
                        userData.channel,
                        userData.north_port,
                        userData.south_port
                    ]
                    );
                    $cordovaToast.show("Data inserted", "short", "center")

                });
            } else {
                $cordovaToast.show("db not found, your browser does not support web sql!", "short", "center")
            }

        } else {
            $cordovaToast.show("ERROR", "short", "center")
        }

    }


    return service;

});