angular.module("starter.services", ["ngCordova"])

.factory("services", function (
     $http
    ,$cordovaToast
    ,$q
    ,$ionicPopup
    ,$timeout
    ,$cordovaSQLite
    ,$ionicLoading
    ,$cordovaFileTransfer
    ) {

    userData = {};
    service = {};

    service.getData = function (){
        var defered = $q.defer();
        var promise = defered.promise;
        var db = $cordovaSQLite.openDB({ name: 'my.db' });

        var query = "SELECT * FROM user";
        $cordovaSQLite.execute(db,query,[]).then(function(result) {

            var userData = {
                "email": result.rows.item(0).email,
                "apikey": result.rows.item(0).apikey,
                "channel": result.rows.item(0).channel,
                "organization": result.rows.item(0).organization,
                "host": result.rows.item(0).host,
                "north_port": result.rows.item(0).north_port,
                "south_port": result.rows.item(0).south_port
            };

            defered.resolve(userData);

        }, function(error) {
            var msg = "error in db";
            defered.reject(msg);
        });

        return promise;
    }

    service.getApiKey = function (){
        var defered = $q.defer();
        var promise = defered.promise;
        var db = $cordovaSQLite.openDB({ name: 'my.db' });

        var query = "SELECT * FROM user";
        $cordovaSQLite.execute(db,query,[]).then(function(result) {

            var apikey = result.rows.item(0).apikey;
            defered.resolve(apikey);

        }, function(error) {
            var msg = "error in db";
            defered.reject(msg);
        });

        return promise;
    }


    function show() {
        $ionicLoading.show({
            template: '<p>Operation in progress</p><ion-spinner></ion-spinner>'
        });
    };

    function showDownload() {
        $ionicLoading.show({
            template: '<p>Downloading...</p><ion-spinner></ion-spinner>'
        });
    };

    function hide(){
        $ionicLoading.hide();
    };


    service.webSocketDialog = function (request){

        var title;
        switch (request.name) {
            case "SET_CLOCK_EQUIPMENT":
                title = "Set clock equipment";
                break;
            case "POWER_ON_EQUIPMENT":
                title = "Power on equipment";
                break;
            case "POWER_OFF_EQUIPMENT":
                title = "Power off equipment";
                break;
            case "REBOOT_EQUIPMENT":
                title = "Reboot equipment";
                break;
            case "REFRESH_LOCATION":
                title = "Refresh location";
                break;
            case "REFRESH_INFO":
                title = "Refresh info";
                break;
            case "REFRESH_PRESENCE":
                title = "Refresh Presence";
                break;
            case "STATUS_DIAGNOSTIC":
                title = "Status diagnostic";
                break;
            case "EQUIPMENT_DIAGNOSTIC":
                title = "Equipment diagnostic";
                break;
            case "WAKE_UP_COMMUNICATIONS":
                title = "Wake up comunications";
                break;
            case "RESET_COMMUNICATIONS":
                title = "Reset communications";
                break;
            case "ADMINISTRATIVE_STATUS_CHANGE":
                title = "Administrative status change";
                break;
            case "SHUT_DOWN_COMMUNICATIONS":
                title = "Shut down communications";
                break;
            case "SERVICE_CONFIGURATION":
                title = "Service configuration";
                break;
            case "RATE_PLAN_CHANGE":
                title = "Rate plan change";
                break;
            case "APN_ALLOWED":
                title = "APN allowed";
                break;
            case "SIM_REPLACEMENT":
                title = "SIM replacement";
                break;
            case "FACTORY_RESET":
                title = "Factory reset";
                break;
            default:
                title = "Default"; 

        };

        var alertPopup = $ionicPopup.alert({
            title: title,
            template: "ID: " + request.id + "<br/> <br/> Timestamp: " + request.timestamp
        });

        alertPopup.then(function(res) {
            show($ionicLoading);
            $timeout(function() {
                hide($ionicLoading);
                $cordovaToast.show("Finished operation", "short", "center")
            }, 2000);
        });


    }

    service.webSocketDialogUpdate = function (request){
        var alertPopup = $ionicPopup.alert({
            title: "Update",
            template: "ID: " + request.id + "<br/> <br/> Timestamp: " + request.timestamp
                + "<br/> <br/> Size: " + JSON.stringify(request.parameters[2].value.array[0].size)
        });

        alertPopup.then(function(res) {

            document.addEventListener('deviceready', function () {

            var url = request.parameters[2].value.array[0].downloadUrl;
            var targetPath = cordova.file.dataDirectory + "/" + file.filename;
            var trustHosts = true;
            var options = {};

            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
              .then(function(result) {
                $cordovaToast.show("succes", "short", "center")
                $cordovaToast.show(result, "short", "center")
              }, function(err) {
                $cordovaToast.show("error", "short", "center")
              }, function (progress) {
                $cordovaToast.show("in progress", "short", "center")

              });

           }, false);
        });
    }

    return service;

});