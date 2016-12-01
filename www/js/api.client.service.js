angular.module("opengate", ["ogapi"])

.factory("opengate", function ($ogapi, services ) {
    service = {};
    service.api = function (userData) {
        var options = {
            apiKey: userData.apikey,
            url: userData.host,
            timeout: 10000
        }
        $ogapi.release().create(options);
        return $ogapi.api;
    }
    
    return service;
});
