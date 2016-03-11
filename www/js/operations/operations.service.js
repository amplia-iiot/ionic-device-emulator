angular.module("starter.operations")

.factory("operationsService", function (
    $cordovaToast
    ,$q
    ,$ionicPopup
    ,$timeout
    ,$cordovaSQLite
    ,$ionicLoading
    ,$cordovaFileTransfer
){
    service = {};
    updateOperations();

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

    function getName(requestName){

        var name;

        switch (requestName) {
            case "SET_CLOCK_EQUIPMENT":
                name = "Set clock equipment";
                break;
            case "POWER_ON_EQUIPMENT":
                name = "Power on equipment";
                break;
            case "POWER_OFF_EQUIPMENT":
                name = "Power off equipment";
                break;
            case "REBOOT_EQUIPMENT":
                name = "Reboot equipment";
                break;
            case "REFRESH_LOCATION":
                name = "Refresh location";
                break;
            case "REFRESH_INFO":
                name = "Refresh info";
                break;
            case "REFRESH_PRESENCE":
                name = "Refresh Presence";
                break;
            case "STATUS_DIAGNOSTIC":
                name = "Status diagnostic";
                break;
            case "EQUIPMENT_DIAGNOSTIC":
                name = "Equipment diagnostic";
                break;
            case "WAKE_UP_COMMUNICATIONS":
                name = "Wake up comunications";
                break;
            case "RESET_COMMUNICATIONS":
                name = "Reset communications";
                break;
            case "ADMINISTRATIVE_STATUS_CHANGE":
                name = "Administrative status change";
                break;
            case "SHUT_DOWN_COMMUNICATIONS":
                name = "Shut down communications";
                break;
            case "SERVICE_CONFIGURATION":
                name = "Service configuration";
                break;
            case "RATE_PLAN_CHANGE":
                name = "Rate plan change";
                break;
            case "APN_ALLOWED":
                name = "APN allowed";
                break;
            case "SIM_REPLACEMENT":
                name = "SIM replacement";
                break;
            case "FACTORY_RESET":
                name = "Factory reset";
                break;
            default:
                name = "Unknown operation"; 
        };

        return name;

    }

    service.webSocketDialog = function (data){
        var name = getName(data.operation.request.name);


        var alertPopup = $ionicPopup.alert({
            title: name,
            template: "ID: " + data.operation.request.id + "<br/> <br/> Timestamp: " + data.operation.request.timestamp
        });

        alertPopup.then(function(res) {
            show($ionicLoading);
            $timeout(function() {
                hide($ionicLoading);
                $cordovaToast.show("Finished operation", "short", "center")
            }, 2000);
        });


    }

    service.webSocketDialogUpdate = function (data){
        $cordovaToast.show("update received", "short", "center")

        /*
        var downloadUrl = [];
        var parameters = data.operation.request.parameters;
        for (var i = 0; i < parameters.length; i++){
            if (parameters[i].name == deploymentElements){
                for (var j = 0; j < parameters[i].value.array.length; j++){
                    downloadUrl[j] = parameters[i].value.array[j].downloadUrl;
                    console.log(downloadUrl[j]);
                }
            }
        } 


        var alertPopup = $ionicPopup.alert({
            title: "Update",
            template: "ID: " + data.operation.request.id + "<br/> <br/> Timestamp: " + data.operation.request.timestamp
                + "<br/> <br/> Size: " + JSON.stringify(request.parameters[2].value.array[0].size)
        });

        alertPopup.then(function(res) {

            document.addEventListener('deviceready', function () {

            var url = request.parameters[2].value.array[0].downloadUrl;
            var targetPath = cordova.file.externalRootDirectory + 'Pictures/' + "update.json";
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
        */
    }

    service.eraseDatabaseDialog = function(){

        var confirmPopup = $ionicPopup.confirm({
            title: "Erase database",
            template: "Do you want to erase the database?"
        });

        confirmPopup.then(function(res) {
            if(res) {
                var db = $cordovaSQLite.openDB({ name: "my.db" });

                var query = "DELETE FROM operations";
                $cordovaSQLite.execute(db,query,[])
                .then(function(result) {
                    updateOperations();
                }, function(error) {
                    $cordovaToast.show("Couldn\'t erase the database", "short", "center")
                });
            }
        });
    }    


    service.deleteOperations = function (){

        var db = $cordovaSQLite.openDB({ name: "my.db" });

        var query = "DELETE FROM operations";
        $cordovaSQLite.execute(db,query,[])
        .then(function(result) {
            updateOperations();
        }, function(error) {
            $cordovaToast.show("Couldn\'t erase the database", "short", "center")
        });


    }

    service.saveOperation = function (data){

        var db = $cordovaSQLite.openDB({ name: "my.db" });

        var id = data.operation.request.id;
        var name = getName(data.operation.request.name);
        var timestamp = data.operation.request.timestamp;

        var query = "INSERT INTO operations (id, name, timestamp) VALUES(?, ?, ?)";
        $cordovaSQLite.execute(db, query, 
            [
                id,
                name,
                timestamp
            ]
        )
        .then(function(result) {
            updateOperations();
        }, function(error) {
            $cordovaToast.show("Couldn\'t save the operation in the db", "short", "center")
        });

    }

    function updateOperations(){

        var listholder = document.getElementById("operationlist");
    
        listholder.innerHTML = "";

        var db = $cordovaSQLite.openDB({ name: 'my.db' });

        var query = "SELECT * FROM operations";

        $cordovaSQLite.execute(db,query,[]).then(function(result) {
            for(var i = result.rows.length - 1; i >= 0; i--){
                var row = result.rows.item(i);

                var date = new Date(Number(row.timestamp)).toDateString();
                
                listholder.innerHTML += "</div> <li class=\"item\"><h2>" 
                + row.name + "</h2> <p style=\"text-indent:20px;\">" 
                + row.id + "</p> <p style=\"text-indent:20px;\">"
                + date + "</p></li></div>"
            }

        }, function(error) {
            $cordovaToast.show("error", "short", "center")
        });


    }

    return service;

});