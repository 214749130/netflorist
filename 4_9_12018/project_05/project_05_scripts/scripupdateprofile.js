/// <reference path="angular.js" />
var url = "http://localhost:24148/api/customers";
//Defining a Angular module
var app = angular.module('myApp', []);

//Defining a Angular Controller
app.controller('MyCtrl', ['$scope', '$http', function ($scope, $http, $window) {

    Getperson();

    function Getperson() {
        $http({
            method: 'GET',
            url: '/api/customers'
        });
    }
    var onSuccess = function (response) { $scope.person = response.data };
    var onFailure = function (reason) { $scope.error = reason };

    var getGetpersons = function () {
        $http.get(url)
            .then(onSuccess, onFailure)
    };
    getGetpersons();


    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;
    $scope.id = userData.id;
    //console.log($scope.ID);
   
    $scope.editProducts = function (pId) {
        for (i in $scope.person) {

            if ($scope.person[i].id == pId) {

                $scope.newperson = {
                    Id: $scope.person[i].Id,
                    lastname: $scope.person[i].lastname,
                    password: $scope.person[i].password,
                    contact: $scope.person[i].contact,
                    address: $scope.person[i].address,
                    firstname: $scope.person[i].firstname,
                    custemail: $scope.person[i].custemail
                };

            }
        }
    }


    $scope.updateProducts = function () {
        $http({
            method: 'PUT',
            url: '/api/customers/',
            data: JSON.stringify($scope.newperson),
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        }).then(function (success) {
            location.reload();
            alert("update succefully");
        }), function (error) {
            location.reload();
            alert("not updated");
        };
    }

}]);
