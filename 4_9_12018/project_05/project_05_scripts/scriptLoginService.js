var service = angular.module('service', []);

var webapi = {};
service.factory('webapi', function ($http) {
    var url = "http://localhost:24148/api/customers"
     webapi = {};
    webapi.GetUser = function (custemail, password) {
        return $http.get(url + '?custemail=' + custemail + '&password=' + password);
    }
    return webapi;
});


var webapiDriver = {};
service.factory('webapiDriver', function ($http) {
    var url = "http://localhost:24148/api/drivers"
    var webapiDriver = {};
    webapiDriver.GetDriver = function (driveremail, password) {
        return $http.get(url + '?driveremail=' + driveremail + '&password=' + password);
    }
    return webapiDriver;
});


var webapiAdmin = {};
service.factory('webapiAdmin', function ($http) {
    var url = "http://localhost:24148/api/"
    var webapiAdmin = {};
    webapiAdmin.GetAdmin = function (adminemail, password) {
        return $http.get(url + 'admins?adminemail=' + adminemail + '&password=' + password);
    }
    return webapiAdmin;
});


var webapiSupplier = {};
service.factory('webapiSupplier', function ($http) {
    var url = "http://localhost:24148/api/suppliers/"
    var webapiSupplier = {};
    webapiSupplier.GetSupplier = function (supplieremail, password) {
        return $http.get(url + '?supplieremail=' + supplieremail + '&password=' + password);
    }
    return webapiSupplier;
});