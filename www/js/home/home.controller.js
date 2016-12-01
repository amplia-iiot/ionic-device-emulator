"use strict";

angular.module("starter.home")
    .controller("homeController", function(
        $scope, $rootScope, $ionicPlatform, homeService, $ionicLoading, services, $cordovaToast
    ) {
        $rootScope.download = ""

        $rootScope.$watch('download.downloading', function() {
            if ($rootScope.download.downloading) {
                $ionicLoading.show({
                    template: "<p>Downloading</p><ion-spinner></ion-spinner> <br/> <br/>" +
                        " <p href=\"#/app/{{download.progress}}\">{{download.progress}}</p>"
                });
            } else {
                $ionicLoading.hide();
            }
        });

        $scope.sendData = function() {
            $scope.crudInfo = homeService.fillDefaultCrudInfo(userData);
            services.getData()
                .then(function(data) {
                    $scope.userData = data;
                    homeService.sendCrudData($scope.crudInfo, data);
                })
                .catch(function(error) {
                    $cordovaToast.show(error, "short", "center")
                });


        };

        $scope.deleteDevice = function() {
            services.getData()
                .then(function(userData) {
                    $scope.userData = userData;
                    homeService.deleteDeviceDialog(userData);
                })
                .catch(function(error) {
                    $cordovaToast.show(error, "short", "center")
                });
        };

        $scope.fillData = function() {
            services.getData()
                .then(function(userData) {

                    homeService.fillCrudDialog(userData)
                        .then(function(crudData) {
                            if(crudData.statusCode === 404){
                                $cordovaToast.show(crudData.data, "short", "center")
                            }
                            else {
                                $scope.crudInfo = crudData;
                                $cordovaToast.show("Device filled", "short", "center")
                            }   
                        })
                        .catch(function(status) {
                            $cordovaToast.show("Cannot fill the device", "short", "center")
                            $cordovaToast.show(status, "long", "center")
                        });
                })
                .catch(function(err) {
                    $cordovaToast.show(err, "short", "center")
                });
        };


    })