/// <reference path="angular.js" />
var url = "http://localhost:24148/api/deliveryDetails";
var app = angular.module('myApp', []);

app.controller('MyCtrl', ['$scope', '$http', function ($scope, $http) {

    Getproducts();

    function Getproducts() {
        $http({
            method: 'GET',
            url: '/api/deliveryDetails'
        });
    }
    var onSuccess = function (response) { $scope.products = response.data };
    var onFailure = function (reason) { $scope.error = reason };

    var getAllproducts = function () {
        $http.get(url)
            .then(onSuccess, onFailure)
    };
    getAllproducts();

    //Delete a product
    $scope.deleteProducts = function (pId) {
        //Defining $http service for deleting a product
        $http({
            method: 'DELETE',
            url: '/api/deliveryDetails/' + pId
        }).then(function (success) {
            location.reload();
            alert("succefully delived");
        }), function (error) {
            location.reload();
            alert("not delived");
        };
    }

}]);


