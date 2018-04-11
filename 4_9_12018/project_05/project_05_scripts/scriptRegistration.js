/// <reference path="angular.js" />
var NetFlorist = angular.module("myApp", []);

NetFlorist.controller('MainController', function ($scope, $http, $window) {

    var baseURL = "http://localhost:24148/api";
    $scope.save = function () {
        var post = $http({
            method: "POST", url: "/api/users",
            data: {
                custemail: $scope.custemail, firstname: $scope.firstname, password: $scope.password,
                lastname: $scope.lastname, contact: $scope.contact, address: $scope.address
            },
            headers: { "Content-Type": "application/json" }
        }).then(function (success) {
            window.location = '/Html/customerproducts.html';
            $window.alert("succefully registered");
        }, function (error) {
            $window.alert("Enable to register(fill all data inputs fields)");
        });
    }

    //$scope.loadDataToPage = function () {
    //    $http.get(baseURL + "/users")
    //        .then(function (onSuccess) {
    //            $window.alert("succefully")
    //        }, function (err) {
    //            $window.alert("errorToDisplay")
    //        });
    //};

});