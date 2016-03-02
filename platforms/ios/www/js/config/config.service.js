angular.module("starter.config")

.factory("configService", function (
     $http
    ,$cordovaToast
    ,$q
    ,$cordovaSQLite
    ) {

    userData = {};
    service = {};


    service.createUser = function(qrCode){

        var userData = JSON.parse(qrCode);
        var db = $cordovaSQLite.openDB({ name: "my.db" });

        var query = "INSERT INTO user (email, host, apikey, organization, channel, north_port, south_port) VALUES(?, ?, ?, ?, ?, ?, ?)";
        if (typeof userData.email !== "undefined"){
            $cordovaSQLite.execute(db, query, 
                [
                    userData.email,
                    userData.host,
                    userData.apikey,
                    userData.organization,
                    userData.channel,
                    userData.north_port,
                    userData.south_port
                ]

            ).then(function(result) {
                    $cordovaToast.show("user created", "short", "center")
            }, function(error) {
                    $cordovaToast.show("user not created", "short", "center")
            });
        }
    }


    return service;

});