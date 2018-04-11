/// <reference path="angular.js" />
var url = "http://localhost:24148/api/adminProducts";
//Defining a Angular module
var app = angular.module('myApp', []);

//Defining a Angular Controller
app.controller('MyCtrl', ['$scope', '$http', function ($scope, $http, $window) {

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
            url: '/api/adminProducts',
            data: JSON.stringify($scope.newproduct),
            headers: { 'Content-Type': 'application/JSON' }
        }).then(function (success) {
            location.reload();
            alert("added succefully");
        }), function (error) {
            location.reload();
            alert("not added");
        };
    }
    

    //Edit a product
    $scope.editProducts = function (pId) {
        for (i in $scope.products) {
            //Getting the product details from scope based on id
            if ($scope.products[i].productid == pId) {
                //Assigning the Create product scope variable for editing
                $scope.newproduct = {
                    productid: $scope.products[i].productid,
                    productname: $scope.products[i].productname,
                    productprice: $scope.products[i].productprice,
                    productcategory: $scope.products[i].productcategory,
                    productqty: $scope.products[i].productqty,
                    productpicture: $scope.products[i].productpicture
                };

            }
        }
    }

    //Update a product
    $scope.updateProducts = function () {
        //Defining $http service for updating a product
        $http({
            method: 'PUT',
            url: '/api/adminProducts/',
            data: JSON.stringify($scope.newproduct),
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        }).then(function (success) {
            location.reload();
            alert("update succefully");
        }), function (error) {
            location.reload();
            alert("not updated");
        };
    }

    //Delete a product
    $scope.deleteProducts = function (pId) {
        //Defining $http service for deleting a product
        $http({
            method: 'DELETE',
            url: '/api/adminProducts/' + pId
        }).then(function (success) {
            location.reload();
            alert("delete");
        }), function (error) {
            location.reload();
            alert("not delete");
        };
    }

}]);
