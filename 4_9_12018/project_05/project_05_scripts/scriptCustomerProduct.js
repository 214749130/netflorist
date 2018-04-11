/// <reference path="angular.js" />
//Defining a Angular module
var app = angular.module('myApp', []);

//Defining a Angular Controller
app.controller('MyCtrl', ['$scope', '$http', function ($scope, $http) {

    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;

    $scope.logout = function () {
        userData = localStorage.removeItem("user");
        location.href = "home.html";
    }

    if ($scope.role == "customer") {
        //location.href = "hell.html";

        var url = "http://localhost:24148/api/adminProducts";
        //Retrieving the List of product
        Getproducts();

        function Getproducts() {
            //Defining the $http service for getting the product
            $http({
                method: 'GET',
                url: '/api/adminProducts'
            });
        }
        var onSuccess = function (response) { $scope.products = response.data };
        var onFailure = function (reason) { $scope.error = reason };

        var getAllproducts = function () {
            $http.get(url)
                .then(onSuccess, onFailure)
        };
        getAllproducts();


        //Create a new product
        $scope.createProducts = function () {
            //Defining $http service for creating a product
            $http({
                method: 'POST',
                url: '/api/addToCarts',
                data: JSON.stringify($scope.newproduct),
                headers: { 'Content-Type': 'application/JSON' }
            });
            alert("succefully added");

        }


        //Edit a product
        $scope.editProducts = function (pId) {
            for (i in $scope.products) {
                //Getting the product details from scope based on id
                if ($scope.products[i].productid == pId) {
                    //Assigning the Create product scope variable for editing
                    $scope.newproduct = {
                        productid: $scope.products[i].productid,
                        productprice: $scope.products[i].productprice,
                        productname: $scope.products[i].productname,
                        productpicture: $scope.products[i].productpicture,
                        productcategory: $scope.products[i].productcategory,
                        productquantity: $scope.products[i].productquantity

                    };
                }
            }
        }
    }
}]);

app.controller('custHomeProductsController', ['$scope', '$http', function ($scope, $http) {

    var url = "http://localhost:24148/api/adminProducts";
    Getproducts();

    function Getproducts() {
        //Defining the $http service for getting the product
        $http({
            method: 'GET',
            url: '/api/adminProducts'
        });
    }
    var onSuccess = function (response) { $scope.products = response.data };
    var onFailure = function (reason) { $scope.error = reason };

    var getAllproducts = function () {
        $http.get(url)
            .then(onSuccess, onFailure)
    };
    getAllproducts();

}]);
