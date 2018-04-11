
var app = angular.module('myApp', []);

app.controller('payment', function ($scope, $http, $window) {

    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;
    $scope.id = userData.id;

    $scope.logout = function () {
        userData = localStorage.removeItem("user");
        location.href = "home.html";
    }

    if ($scope.role == "customer") {

        var onSuccess = function (response) { $scope.paymentDetailsEFT = response.data };
        var onFailure = function (reason) { $scope.error = reason };
        getAllPaymentDetailsEFT = function () {
            $http.get("http://localhost:24148/api/paymentEFTs")
                .then(onSuccess, onFailure)
        };
        getAllPaymentDetailsEFT();

        var onSuccessCreditCard = function (response) { $scope.paymentDetailsCreditCard = response.data };
        var onFailureCreditCard = function (reason) { $scope.error = reason };
        getAllPaymentDetailsCreditCard = function () {
            $http.get("http://localhost:24148/api/payments")
                .then(onSuccessCreditCard, onFailureCreditCard)
        };
        getAllPaymentDetailsCreditCard();



        var baseURL = "http://localhost:24148/api/";
        $scope.save = function () {
            var post = $http({
                method: "POST",
                url: "/api/payments",
                data: {
                    cardnumber: $scope.cardnumber, cardholdername: $scope.cardholdername, cardexpirydate: $scope.cardexpirydate,
                    cvvnumber: $scope.cvvnumber
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (success) {
                window.location = '/Html/reciept.html';
                $window.alert("succefully payed with CREDITCARD");
                window.location = '/Html/reciept.html';
                var pay = "creditCard";
            }, function (error) {
                $window.alert("Enable to pay(fill all data inputs fields)");
            });
        }


        $scope.paywithEFT = function () {
            var post = $http({
                method: "POST",
                url: "/api/paymentEFTs",
                data: {
                    cardnumber: $scope.cardnumber, bankname: $scope.bankname, transitroutingno: $scope.transitroutingno,
                    bankaccountno: $scope.bankaccountno
                },
                hzaeaders: { "Content-Type": "application/json" }
            }).then(function (success) {
                window.location = '/Html/reciept.html';
                $window.alert("succefully payed with EFT");
                window.location = '/Html/reciept.html';
                var pay = "eft";
            }, function (error) {
                $window.alert("Enable to pay(fill all data inputs fields)");
            });
        }

        $scope.pay = "false";
        $scope.paywithcash = function ($window) {
            window.alert("succefully payed with money");
            window.location = '/Html/reciept.html';
            pay = "true";

            //var pay = {
            //    paying: "cash"
            //};
            //localStorage.setItem("pay", JSON.stringify(pay));
            //var userPayement = localStorage.getItem("pay");
            //$scope.paying = userPayement.paying;
        }

        //displaying payments details (prices, qty, desc) to RECIEPT SLIP
        $scope.cardnumber1 = function () {
            var cardNo = 0;
            angular.forEach($scope.payments, function (payment) {
                cardNo += payment.cardnumber;
            })
            return cardNo
        }
    }
});

// sscriptpayment
app.controller('MyCtrl', ['$scope', '$http', function ($scope, $http) {

    var userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    $scope.name = userData.username;
    $scope.role = userData.role;

    if ($scope.role == "customer") {
        //location.href = "hell.html";

      
        $scope.logout = function()
        {
            userData = localStorage.removeItem("user");
            location.href = "home.html";
        }


        Getproducts();
        function Getproducts() {
            $http({
                method: 'GET',
                url: '/api/addToCarts'
            });
        }
        var onSuccess = function (response) { $scope.products = response.data };
        var onFailure = function (reason) { $scope.error = reason };
        var getAllproducts = function () {
            $http.get("http://localhost:24148/api/addToCarts")
                .then(onSuccess, onFailure)
        };


        getAllproducts();


        $scope.total = function () {
            var total = 0;
            var quantity = 0;
            var totalprice = 0;
            angular.forEach($scope.products, function (product) {
                total = product.productprice * product.productquantity;
                quantity = product.productquantity;
                totalprice = total * quantity;
            });
            return totalprice;
        }
        $scope.discriptionProducts = function () {
            var desc = "";
            angular.forEach($scope.products, function (addToCart) {
                desc += addToCart.productname + "    ";
            })
            return desc;
        }
        $scope.QTYproducts = function () {
            var QTY = "";
            angular.forEach($scope.products, function (addToCart) {
                QTY += addToCart.productquantity;
            })
            return QTY;
        }


        $scope.getTotal = function () {
            var total = 0;
            for (var i = 0; i < $scope.cart.length; i++) {
                var product = $scope.cart.addToCart[i];
                total += (product.price * product.quantity);
            }
            return total;
        }

        //$scope.getTotal = function () {
        //    var total = 0;
        //    for (var i = 0; i < addToCart.length; i++) {
        //        var product = addToCart[i].productquantity;
        //        var p = addToCart[i].productprice;
        //        total += (product* p);
        //    }
        //    return total;
        //}

        //$scope.imageproducts = function () {
        //    var image = "";
        //    var path = "../Gallery/";
        //    angular.forEach($scope.products, function (addToCart) {
        //        image =  (path + addToCart.productpicture);
        //    })
        //    return image;
        //}

        //$scope.quan = 1;
        //$scope.qty = function () {
        //    var QTY = 0;
        //    var decrement_qty_database = 0;
        //    var qtt = 0;
        //    angular.forEach($scope.products, function (addToCart) {
        //    QTY += addToCart.productid;
        //    qtt = $scope.quan;         
        //    })
        //    return qtt;
        //}

        //Delete a product
        $scope.deleteProducts = function (pId) {
            //Defining $http service for deleting a product
            $http({
                method: 'DELETE',
                url: '/api/addToCarts/' + pId
            });
        }
    }
}]);
