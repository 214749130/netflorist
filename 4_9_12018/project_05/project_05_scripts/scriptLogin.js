var app = angular.module('myApp', ['service']);

//app.controller('loginController', function ($scope, $http, webapi, $window, $location) {
//    $scope.access = function () {
//        webapi.GetUser($scope.custemail, $scope.password).then(function (response) {
//            if (response.data === null) {
//                window.alert(response.statusText);
//            }
//            else {
//                window.alert("successful");
//                window.location = '/Html/home.html';
//            } de
//        }),
//            function (response) {
//                window.alert("register");
//            }
//    };
//});


app.controller('customerloginController', function ($scope, $http, webapi, $window, $location) {
    $scope.access = function () {
        webapi.GetUser($scope.custemail, $scope.password).then(function (response) {
            if (response.data === null) {
                window.alert(response.statusText + "wrong credintials");
                window.location = '/Html/reg1.html';
            }
            else {
                $scope.username = response.data.firstname;
                $scope.id = response.data.Id;
                var user = {
                    username: $scope.username,
                    role: "customer",
                    id : $scope.id
                };
                localStorage.setItem("user", JSON.stringify(user));
                window.alert("successful " + $scope.username);
                window.location = '/Html/customerproducts.html';
            }
        })
    }
});


app.controller('adminloginController', function ($scope, $http, webapiAdmin, $window, $location) {
    $scope.accessA = function () {
        webapiAdmin.GetAdmin($scope.adminemail, $scope.password).then(function (response) {
            if (response.data === null) {
                window.alert("wrong credintials");
                window.location = '/Html/adminlogin.html';
            }
            else {
                window.alert("successful");
                window.location = '/Html/adminproducts.html';
            }
        }),
            function (response) {
                window.alert("register first");
                window.location = '/Html/reg1.html';
            }
    };
});


app.controller('driverloginController', function ($scope, $http, webapiDriver, $window, $location) {
    $scope.accessD = function () {
        webapiDriver.GetDriver($scope.driveremail, $scope.password).then(function (response) {
            if (response.data === null) {
                window.alert("wrong credintials");
                window.location = '/Html/driverlogin.html';
            }
            else {
                window.alert("successful");
                window.location = '/Html/oders.html';
            }
        }),
            function (response) {
                window.alert("register first");
                window.location = '/Html/reg1.html';
            }
    };
});


app.controller('supplierloginController', function ($scope, $http, webapiSupplier, $window, $location) {
    $scope.accessS = function () {
        webapiSupplier.GetSupplier($scope.supplieremail, $scope.password).then(function (response) {
            if (response.data === null) {
                window.alert("wrong credintials '\n'");
                window.location = '/Html/supplierlogin.html';
            }
            else {
                window.alert("successful");
                window.location = '/Html/supplier.html';
            }
        }),
            function (response) {
                window.alert("register first");
                window.location = '/Html/reg1.html';
            }
    };
});