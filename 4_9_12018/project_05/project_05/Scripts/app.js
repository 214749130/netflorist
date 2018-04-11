/// <reference path="angular.js" />

var app = angular.module('myApp', []);

app.controller('paywithcashcontroller', function ($scope, $http, $window) {

    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;
    $scope.id = userData.id;

    $scope.logout = function () {
        userData = localStorage.removeItem("user");
        location.href = "home.html";
    };

    //if ($scope.role == "customers")
    {

     //   $scope.pay = "false";
        $scope.paywithcash = function ($window) {
            window.alert("successfully payed with money");
            window.location = '/Html/payedwithCASH.html';
        };

        //displaying payments details (prices, qty, desc) to RECIEPT SLIP
        $scope.cardnumber1 = function () {
            var cardNo = 0;
            angular.forEach($scope.payments, function (payment) {
                cardNo += payment.cardnumber;
            });
            return cardNo;
        };


        $scope.pay = function () {
            $http({
                method: 'POST',
                url: "/api/paymentCashes",
                data: JSON.stringify($scope.paywithcash),
                headers: { 'Content-Type': 'application/JSON' }
            }).then(function (success) {
                window.alert("successfully payed with money");
                window.location = '/Html/payedwithCASH.html';
            }), function (error) {
                location.reload();
                alert("not successfully");
            };
        };

    }
});

app.controller('paywithcreditcardcontroller', ['$scope', '$http', function ($scope, $http, $window) {

    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;
    $scope.id = userData.id;

    $scope.logout = function () {
        userData = localStorage.removeItem("user");
        location.href = "home.html";
    };

    //if ($scope.role === "customers")
    {

        
        var onSuccessCreditCard = function (response) { $scope.paymentDetailsCreditCard = response.data; };
        var onFailureCreditCard = function (reason) { $scope.error = reason; };
        getAllPaymentDetailsCreditCard = function () {
            $http.get("http://localhost:24148/api/paymentCreditCards")
                .then(onSuccessCreditCard, onFailureCreditCard);
        };
        getAllPaymentDetailsCreditCard();

        //var url = "http://localhost:24148/api/paymentCreditCards";
        $scope.save = function () {
            $http({
                method: 'POST',
                url: "/api/paymentCreditCards",
                data: JSON.stringify($scope.paywithcreditcard),
                headers: { 'Content-Type': 'application/JSON' }
            }).then(function (success) {
                window.location = '/Html/payedwithCREDITCARD.html';
                alert("successfully payed with credit card");
            }), function (error) {
                location.reload();
                alert("not registered");
            };
        };

    }
}]);

app.controller('paywithEFTcontroller', ['$scope', '$http', function ($scope, $http, $window) {

    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;
    $scope.id = userData.id;

    $scope.logout = function () {
        userData = localStorage.removeItem("user");
        location.href = "home.html";
    };

   // if ($scope.role === "customers")
    {

        var onSuccess = function (response) { $scope.paymentDetailsEFT = response.data; };
        var onFailure = function (reason) { $scope.error = reason; };
        getAllPaymentDetailsEFT = function () {
            $http.get("http://localhost:24148/api/paymentEFTs")
                .then(onSuccess, onFailure);
        };
        getAllPaymentDetailsEFT();


        $scope.paywithEFT = function () {
            var post = $http({
                method: "POST",
                url: "/api/paymentEFTs",
                data: JSON.stringify($scope.paywithET),
                hzaeaders: { "Content-Type": "application/json" }
            }).then(function (success) {
                alert("successfully payed with EFT");
                location = '/Html/payedwithEFT.html';
            }, function (error) {
                alert("Enable to pay");
            });
        };
    }
}]);

app.controller('cartcontroller', ['$scope', '$http', function ($scope, $http) {

    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;

    if ($scope.role === "customer") {

        $scope.logout = function () {
            userData = localStorage.removeItem("user");
            location.href = "home.html";
        };

        var onSuccess = function (response) { $scope.products = response.data; };
        var onFailure = function (reason) { $scope.error = reason; };
        var getAllproducts = function () {
            $http.get("http://localhost:24148/api/addToCarts")
                .then(onSuccess, onFailure);
        };
        getAllproducts();


        $scope.total = function () {
            var total = 0;
            var quantity = 0;
            var totalprice = 0;
            angular.forEach($scope.products, function (product) {
                total = product.productprice * product.productquantity;
                //quantity = product.productquantity;
                totalprice += total; //* quantity;
            });
            return totalprice;
        };
        $scope.discriptionProducts = function () {
            var desc = "";
            angular.forEach($scope.products, function (addToCart) {
                desc += addToCart.productname + "  .  ";
            });
            return desc;
        };
        $scope.QTYproducts = function () {
            var QTY = "";
            angular.forEach($scope.products, function (addToCart) {
                QTY += addToCart.productquantity;
            });
            return QTY;
        };
        $scope.getTotal = function () {
            var total = 0;
            for (var i = 0; i < $scope.cart.length; i++) {
                var product = $scope.cart.addToCart[i];
                total += product.price * product.quantity;
            }
            return total;
        };

        $scope.deleteProducts = function (pId) {
            $http({
                method: 'DELETE',
                url: '/api/addToCarts/' + pId
            }).then(function (success) {
                location.reload();
                alert("successfully cancelled ");
            }), function (error) {
                location.reload();
                alert("not cancelled");
            };
        };


        $scope.deleteCart = function () {
            $http({
                method: 'DELETE',
                url: '/api/addToCarts'
            });
        };
        $scope.deletePaymentsEFT = function (pId) {
            $http({
                method: 'DELETE',
                url: '/api/paymentEFTs/' + pId
            });
        };
        $scope.deletePaymentsCreditCard = function (pId) {
            $http({
                method: 'DELETE',
                url: '/api/payments/' + pId
            });
        };
    }
}]);

app.controller('customerproductscontroller', ['$scope', '$http', function ($scope, $http) {

    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;

    $scope.logout = function () {
        userData = localStorage.removeItem("user");
        location.href = "home.html";
    };

    if ($scope.role === "customer") {
        //location.href = "hell.html";

        var url = "http://localhost:24148/api/adminProducts";

        var onSuccess = function (response) { $scope.products = response.data; };
        var onFailure = function (reason) { $scope.error = reason; };

        var getAllproducts = function () {
            $http.get(url)
                .then(onSuccess, onFailure);
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
            }).then(function (success) {
                location.reload();
                alert("successfully added to Cart");
            }), function (error) {
                location.reload();
                alert("not added");
            };

        };


        //Edit a product
        $scope.editProducts = function (pId) {
            for (i in $scope.products) {
                //Getting the product details from scope based on id
                if ($scope.products[i].productid === pId) {
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
        };
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
    var onSuccess = function (response) { $scope.products = response.data; };
    var onFailure = function (reason) { $scope.error = reason; };

    var getAllproducts = function () {
        $http.get(url)
            .then(onSuccess, onFailure);
    };
    getAllproducts();

}]);

app.controller('adminproductscontroller', ['$scope', '$http', function ($scope, $http, $window) {


    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;

    if ($scope.role === "admin" || $scope.role ==="supplier") {

        $scope.logout = function () {
            userData = localStorage.removeItem("user");
            location.href = "home.html";
        };

        var url = "http://localhost:24148/api/adminProducts";

        var onSuccess = function (response) { $scope.products = response.data; };
        var onFailure = function (reason) { $scope.error = reason; };

        var getAllproducts = function () {
            $http.get(url)
                .then(onSuccess, onFailure);
        };
        getAllproducts();

        $scope.createProducts = function () {
            //Defining $http service for creating a product
            $http({
                method: 'POST',
                url: '/api/adminProducts',
                data: JSON.stringify($scope.newproduct),
                headers: { 'Content-Type': 'application/JSON' }
            }).then(function (success) {
                location.reload();
                alert("added successfully");
            }), function (error) {
                location.reload();
                alert("not added");
            };
        };

        $scope.editProducts = function (pId) {
            for (i in $scope.products) {
                //Getting the product details from scope based on id
                if ($scope.products[i].productid === pId) {
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
        };


        //$scope.status = function () {
        //    var show = "s";

        //    var prod = [];
        //    prod = $scope.products;
        //    for (var i = 0; i < $scope.products.length; i++) {
 
        //        if (231 > $scope.products[i].productqty) {
        //            show = "OUT OFF STOKE" + $scope.products[i].productid
        //        } else {
        //            show = "SUPPLY..." + $scope.products[i].productid
        //        }
        //        return show
        //        console.log(parseInt($scope.products[i].productqty));
        //    }
        //};


        $scope.updateProducts = function () {
            //Defining $http service for updating a product
            $http({
                method: 'PUT',
                url: '/api/adminProducts/',
                data: JSON.stringify($scope.newproduct),
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            }).then(function (success) {
                location.reload();
                alert("update successfully");
            }), function (error) {
                location.reload();
                alert("not updated");
            };
        };

        $scope.deleteProducts = function (pId) {
            //Defining $http service for deleting a product
            $http({
                method: 'DELETE',
                url: '/api/adminProducts/' + pId
            }).then(function (success) {
                location.reload();
                alert("delete successfully");
            }), function (error) {
                location.reload();
                alert("not delete");
            };
        };
        //update products stock alert
        $scope.alertAdminAboutSuppliedProducts = function () {
            var show = "";
            angular.forEach($scope.products, function (adminProducts) {
                if (adminProducts.productqty >= 2)
                {
                    show = "PRODUCTS SUPPLYED";
                } else
                {
                    show = adminProducts.productqty + " OUT OF STOCK ";
                }
            });
            return show;
        };

    }
}]);

app.controller('deliverydetailscontroller', function ($scope, $http, $window) {

    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;

    $scope.logout = function () {
        userData = localStorage.removeItem("user");
        location.href = "home.html";
    };

    if ($scope.role === "customer") {



        var url = "http://localhost:24148/api/deliveryDetails";
        var onSuccess = function (response) { $scope.products = response.data; };
        var onFailure = function (reason) { $scope.error = reason; };

        var getAllproducts = function () {
            $http.get(url)
                .then(onSuccess, onFailure);
        };
        getAllproducts();

        $scope.save = function () {
            $http({
                method: 'POST',
                url: "/api/deliveryDetails",
                data: JSON.stringify($scope.newdetails),
                headers: { 'Content-Type': 'application/JSON' }
            }).then(function (success) {
                location.reload();
                alert("successfully sended delivery details");
                location = '/Html/reciept.html';
            }), function (error) {
                location.reload();
                alert("not registered");
            };

        };

        $scope.deleteProducts = function (pId) {
            $http({
                method: 'DELETE',
                url: '/api/deliveryDetails/' + pId
            });
        };
    }
});

app.controller('oderscontroller', ['$scope', '$http', function ($scope, $http) {

    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;

    if ($scope.role === "driver" ) {

        $scope.logout = function () {
            userData = localStorage.removeItem("user");
            location.href = "home.html";
        };

        var url = "http://localhost:24148/api/deliveryDetails";

        var onSuccess = function (response) { $scope.products = response.data; };
        var onFailure = function (reason) { $scope.error = reason; };

        var getAllproducts = function () {
            $http.get(url)
                .then(onSuccess, onFailure);
        };
        getAllproducts();

        //$scope.g = function () {
        //    var results = "delivered";
        //    return results;
        //}

        $scope.deleteProducts = function (pId) {
            g();
            $http({
                method: 'DELETE',
                url: '/api/deliveryDetails/' + pId
            }).then(function (success) {
                location.reload();
                alert("successfully delived");
            }), function (error) {
                location.reload();
                alert("not delived");
            };
        };
    }

}]);

app.controller('registraticontroller', function ($scope, $http, $window) {

    var url = "http://localhost:24148/api/customers";
    $scope.save = function () {
        $http({
            method: 'POST',
            url: "/api/customers",
            data: JSON.stringify($scope.newuser),
            headers: { 'Content-Type': 'application/JSON' }
        }).then(function (success) {
            location.reload();
            alert("successfully registered");
        }), function (error) {
            location.reload();
            alert("not registered");
        };

    };

});

app.controller('updateprofilecontroller', ['$scope', '$http', function ($scope, $http) {


    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;
    $scope.id = userData.id;
    //console.log($scope.ID);

    if ($scope.role === "customer") {

        $scope.logout = function () {
            userData = localStorage.removeItem("user");
            location.href = "home.html";
        };

        var url = "http://localhost:24148/api/customers";
        var onSuccess = function (response) { $scope.person = response.data; };
        var onFailure = function (reason) { $scope.error = reason; };

        var getGetpersons = function () {
            $http.get(url)
                .then(onSuccess, onFailure);
        };
        getGetpersons();


        $scope.editperson = function (pId) {
            for (i in $scope.person) {

                if ($scope.person[i].id === pId) {

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
        };


        $scope.updatePerson = function () {
            $http({
                method: 'PUT',
                url: '/api/customers/',
                data: JSON.stringify($scope.newperson),
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            }).then(function (success) {
                location.reload();
                alert("update successfully");
            }), function (error) {
                location.reload();
                alert("not updated");
            };
        };
    }
}]);

app.controller('managedrivercontroller', ['$scope', '$http', function ($scope, $http, $window) {


    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;

    if ($scope.role === "admin") {

        $scope.logout = function () {
            userData = localStorage.removeItem("user");
            location.href = "home.html";
        };


        var url = "http://localhost:24148/api/drivers";
        var onSuccess = function (response) { $scope.drivers = response.data; };
        var onFailure = function (reason) { $scope.error = reason; };

        var getAllDrivers = function () {
            $http.get(url)
                .then(onSuccess, onFailure);
        };
        getAllDrivers();


        $scope.createDrivers = function () {
            $http({
                method: 'POST',
                url: '/api/drivers',
                data: JSON.stringify($scope.newdriver),
                headers: { 'Content-Type': 'application/JSON' }
            }).then(function (success) {
                location.reload();
                alert("added successfully");
            }), function (error) {
                location.reload();
                alert("not added");
            };
        };

        $scope.editDrivers = function (pId) {
            for (i in $scope.drivers) {
                if ($scope.drivers[i].driverId === pId) {
                    $scope.newdriver = {
                        driverId: $scope.drivers[i].driverId,
                        driveremail: $scope.drivers[i].driveremail,
                        password: $scope.drivers[i].password,
                        surname: $scope.drivers[i].surname,
                        contact: $scope.drivers[i].contact,
                        firstname: $scope.drivers[i].firstname
                    };

                }
            }
        };

        $scope.updateDrivers = function () {

            $http({
                method: 'PUT',
                url: '/api/drivers/',
                data: JSON.stringify($scope.newdriver),
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            }).then(function (success) {
                location.reload();
                alert("update successfully");
            }), function (error) {
                location.reload();
                alert("not updated");
            };
        };

        $scope.deleteDrivers = function (pId) {
            $http({
                method: 'DELETE',
                url: '/api/drivers/' + pId
            }).then(function (success) {
                location.reload();
                alert("deleted successfully");
            }), function (error) {
                location.reload();
                alert("not deleted");
            };
        };
    }
}]);

app.controller('managesuppliercontroller', ['$scope', '$http', function ($scope, $http, $window) {

    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;

    if ($scope.role === "admin") {

        $scope.logout = function () {
            userData = localStorage.removeItem("user");
            location.href = "home.html";
        };


        var url = "http://localhost:24148/api/suppliers";
        var onSuccess = function (response) { $scope.suppliers = response.data; };
        var onFailure = function (reason) { $scope.error = reason; };

        var getAllSuppliers = function () {
            $http.get(url)
                .then(onSuccess, onFailure);
        };
        getAllSuppliers();


        //Create a new product
        $scope.createSuppliers = function () {
            //Defining $http service for creating a product
            $http({
                method: 'POST',
                url: '/api/suppliers',
                data: JSON.stringify($scope.newsupplier),
                headers: { 'Content-Type': 'application/JSON' }
            }).then(function (success) {
                location.reload();
                alert("added successfully");
            }), function (error) {
                location.reload();
                alert("not added");
            };
        };


        //Edit a product
        $scope.editSuppliers = function (pId) {
            for (i in $scope.suppliers) {
                //Getting the product details from scope based on id
                if ($scope.suppliers[i].Id === pId) {
                    //Assigning the Create product scope variable for editing
                    $scope.newsupplier = {
                        Id: $scope.suppliers[i].Id,
                        supplieremail: $scope.suppliers[i].supplieremail,
                        password: $scope.suppliers[i].password,
                        surname: $scope.suppliers[i].surname,
                        contact: $scope.suppliers[i].contact,
                        firstname: $scope.suppliers[i].firstname
                    };

                }
            }
        };

        //Update a product
        $scope.updateSuppliers = function () {
            //Defining $http service for updating a product
            $http({
                method: 'PUT',
                url: '/api/suppliers/',
                data: JSON.stringify($scope.newsupplier),
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            }).then(function (success) {
                location.reload();
                alert("update successfully");
            }), function (error) {
                location.reload();
                alert("not updated");
            };
        };

        //Delete a product
        $scope.deleteSuppliers = function (pId) {
            //Defining $http service for deleting a product
            $http({
                method: 'DELETE',
                url: '/api/suppliers/' + pId
            }).then(function (success) {
                location.reload();
                alert("deleted successfully");
            }), function (error) {
                location.reload();
                alert("not deleted");
            };
        };
    }
}]);

app.controller('manageadmincontroller', ['$scope', '$http', function ($scope, $http, $window) {

    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;

    if ($scope.role === "admin") {

        $scope.logout = function () {
            userData = localStorage.removeItem("user");
            location.href = "home.html";
        };


        var url = "http://localhost:24148/api/admins";
        var onSuccess = function (response) { $scope.admins = response.data; };
        var onFailure = function (reason) { $scope.error = reason; };

        var getAllAdmins = function () {
            $http.get(url)
                .then(onSuccess, onFailure);
        };
        getAllAdmins();


        //Create a new product
        $scope.createAdmins = function () {
            //Defining $http service for creating a product
            $http({
                method: 'POST',
                url: '/api/admins',
                data: JSON.stringify($scope.newadmin),
                headers: { 'Content-Type': 'application/JSON' }
            }).then(function (success) {
                location.reload();
                alert("added successfully");
            }), function (error) {
                location.reload();
                alert("not added");
            };
        };


        //Edit a product
        $scope.editAdmins = function (pId) {
            for (i in $scope.admins) {
                //Getting the product details from scope based on id
                if ($scope.admins[i].Id === pId) {
                    //Assigning the Create product scope variable for editing
                    $scope.newadmin = {
                        Id: $scope.admins[i].Id,
                        adminemail: $scope.admins[i].adminemail,
                        password: $scope.admins[i].password,
                        surname: $scope.admins[i].surname,
                        contact: $scope.admins[i].contact,
                        firstname: $scope.admins[i].firstname
                    };

                }
            }
        };

        //Update a product
        $scope.updateAdmins = function () {
            //Defining $http service for updating a product
            $http({
                method: 'PUT',
                url: '/api/admins/',
                data: JSON.stringify($scope.newadmin),
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            }).then(function (success) {
                location.reload();
                alert("update successfully");
            }), function (error) {
                location.reload();
                alert("not updated");
            };
        };

        //Delete a product
        $scope.deleteAdmins = function (pId) {
            //Defining $http service for deleting a product
            $http({
                method: 'DELETE',
                url: '/api/admins/' + pId
            }).then(function (success) {
                location.reload();
                alert("deleted successfully");
            }), function (error) {
                location.reload();
                alert("not deleted");
            };
        };
    }
}]);

app.controller('myCtrl', function ($scope) {
    $scope.cars = {
        car01: "Ford",
        car02: "test",
        car03: "Volvo"
    };
});
