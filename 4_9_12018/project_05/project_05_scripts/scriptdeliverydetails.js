/// <reference path="angular.js" />

var NetFlorist = angular.module("myApp", []);

NetFlorist.controller('MainController', function ($scope, $http, $window) {

    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;

    $scope.logout = function () {
        userData = localStorage.removeItem("user");
        location.href = "home.html";
    }

    if ($scope.role == "customer") {

        var url = "http://localhost:24148/api/deliveryDetails";
        var baseURL = "http://localhost:24148/api";
        $scope.save = function () {
            var post = $http({
                method: "POST", url: "/api/deliveryDetails",
                data: {
                    deliveryid: $scope.deliveryid, deliverydate: $scope.deliverydate, recipientname: $scope.recipientname,
                    recipientsurname: $scope.recipientsurname, phonenumber: $scope.phonenumber, streetname: $scope.streetname,
                    areaname: $scope.areaname, city: $scope.city, province: $scope.province, additionalinformation: $scope.additionalinformation
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (success) {
                $window.alert("succefully sended Delivery Details");
                window.location = '/Html/reciept.html';
            }, function (error) {
                $window.alert("Enable to register(fill all data inputs fields)");
            });
        }

        $scope.deleteProducts = function (pId) {
            //Defining $http service for deleting a product
            $http({
                method: 'DELETE',
                url: '/api/deliveryDetails/' + pId
            });
        }
    }
});
//mpho.mashigo@sita.co.za


