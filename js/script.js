let app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "home.html"
        })
        .when("/product", {
            templateUrl: "product.html"
        })
        .when("/about", {
            templateUrl: "about.html"
        })
        .when("/contact", {
            templateUrl: "contact.html"
        })
        .when("/checkout", {
            templateUrl: "checkout.html"
        })
        .when("/detail", {
            templateUrl: "detail.html"
        })
        .when("/cart", {
            templateUrl: "cart.html"
        });
});

// đọc file json
app.controller("myCTRL", function ($scope, $http, $location) {
    $http.get('product.json').then(function (response) {
        $scope.products = response.data.products;
    });
});


// đọc file json
app.controller("MainController", function ($scope, $http, $location) {
    $http.get('product.json').then(function (response) {
        $scope.products = response.data.products;
    });

    $scope.filterProducts = function (filterType) {
        $scope.searchTerm = filterType;
    };
});

// đọc file json
app.controller("CartController", function ($scope, $http) {
    $http.get('product.json').then(function (response) {
        $scope.products = response.data.products;
    });
});

app.controller('DetailController', function ($scope, $location) {
    $scope.product = $location.search().product;
});

app.controller('myController', function ($scope, $http, $location) {

    $scope.cart = [];

    $scope.addToCart = function (product) {
        $scope.cart.push(product);
        $scope.total();
    }

    $scope.addToCart = function (product, quantity) {
        $scope.cart.push({
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    };

    $scope.getTotal = function () {
        var total = 0;
        for (var i = 0; i < $scope.cart.length; i++) {
            total += $scope.cart[i].price * $scope.cart[i].quantity;
        }
        return total;
    };



    $scope.placeOrder = function () {
        let paymentOption = document.querySelector('input[name="payment_option"]:checked');
        if (!paymentOption) {
            alert('Please choose payment option !');
        }
        else {
            alert('Thank you !');
            $scope.cart = [];
        };
    }

    $scope.removeItem = function (item) {
        var index = $scope.cart.indexOf(item);
        $scope.cart.splice(index, 1);
    };

    $scope.submitLogin = function () {
        alert("tài khoản không tồn tại");
    };

    $scope.registerModal = function () {
        alert("Đăng ký thành công!");
    }

    $scope.sortByOption = function (selectedOption) {
        if (selectedOption === "priceAsc") {
            $scope.sortType = 'price';
            $scope.sortReverse = false;
        } else if (selectedOption === "priceDesc") {
            $scope.sortType = 'price';
            $scope.sortReverse = true;
        }
    }

    //remove all
    $scope.removeItemAll = function (item) {
        $scope.cart = [];
    };
});

app.controller('myCtrl', function ($scope, $interval) { });

app.directive('showProduct', function ($location) {
    return {
        restrict: 'A',
        scope: {
            product: '='
        },
        link: function (scope, element, attrs) {
            element.on('click', function () {
                $location.path('/detail').search({ product: scope.product });
            });
        }
    };
});

app.directive('countdownTimer', function ($interval) {
    return {
        restrict: 'E',
        scope: {
            days: '=',
            hours: '=',
            minutes: '=',
            seconds: '='
        },
        template: '<div class="countdown container text-center d-flex justify-content-center align-items-center ml-2">' +
            '<div class="time">' +
            '<div class="item">' +
            '<div id="day">{{days}}</div>' +
            'day' +
            '</div>' +
            '<div class="item">' +
            '<div id="hour">{{hours}}</div>' +
            'hour' +
            '</div>' +
            '<div class="item">' +
            '<div id="minute">{{minutes}}</div>' +
            'minute' +
            '</div>' +
            '<div class="item">' +
            '<div id="seconds">{{seconds}}</div>' +
            'seconds' +
            '</div>' +
            '</div>' +
            '</div>',
        link: function (scope) {
            $interval(function () {
                scope.seconds--;
                if (scope.seconds < 0) {
                    scope.minutes--;
                    scope.seconds = 59;
                }
                if (scope.minutes < 0) {
                    scope.hours--;
                    scope.minutes = 59;
                }
                if (scope.hours < 0) {
                    scope.days--;
                    scope.hours = 59;
                }
                if (scope.days < 0) {
                    return;
                }
            }, 1000);
        }
    };
});



app.directive('clock', function ($interval) {
    return {
        restrict: 'E',
        template:
            '<div class="container-clock btn d-flex flex-column text-center" ng-click="toggleDetails()">' +
            '<p ng-show="!showDetails" class="pt-3">info</p>' +
            '<p ng-show="showDetails" class="pt-2">{{currentDate}} - {{currentTime}}</p>' +
            '<p ng-show="showDetails" class="">391a, Nam Ky Khoi Nghia</p>' +
            '<p ng-show="showDetails" class="">ward 14, district 3, hcm city</p>' +
            '</div>',
        scope: {},
        link: function (scope) {
            // Lấy thời gian hiện tại
            $interval(function () {
                scope.currentDate = new Date().toLocaleDateString();
                scope.currentTime = new Date().toLocaleTimeString();
            }, 1000);
            // Điều khiển hiển thị thông tin
            scope.showDetails = false;
            scope.toggleDetails = function () {
                scope.showDetails = !scope.showDetails;
            };
        }
    };
});



app.directive("quantityButtons", function () {
    return {
        restrict: "E",
        scope: {
            quantity: "="
        },
        template: `
        <button class="disable" ng-click="decrease()">-</button>
        <input type="text" value="{{quantity}}" class="input" ng-model="quantity">
        <button class="disable1" ng-click="increase()">+</button>`,
        controller: function ($scope) {
            $scope.quantity = $scope.quantity || 1;

            $scope.decrease = function () {
                if ($scope.quantity > 1) {
                    $scope.quantity--;
                }
            };

            $scope.increase = function () {
                $scope.quantity++;
            };
        }
    };
});


//cụm code tái sử dụng pagination
app.directive("pagination", function () {
    return {
        restrict: "E",
        scope: {
            currentPage: "=",
            totalItems: "=",
            pageSize: "="
        },
        template:
            '<ul class="pagination align-item-center">' +
            '<li ng-repeat="page in pages()" ng-class="{active: page == currentPage}">' +
            '<a ng-click="selectPage(page)" class="chung-2">{{page}}</a>' +
            '</li>' +
            '</ul>',
        link: function (scope) {
            scope.currentPage = 1;
            scope.totalItems = 65;
            scope.pageSize = 20;
            scope.pages = function () {
                var pages = [];
                for (var i = 1; i <= scope.totalPages; i++) {
                    pages.push(i);
                }
                return pages;
            };

            scope.selectPage = function (page) {
                scope.currentPage = page;
            };

            scope.$watch("totalItems", function () {
                scope.totalPages = Math.ceil(scope.totalItems / scope.pageSize);
            });
        }
    };
});


app.directive('ratingStar', function () {
    return {
        scope: {
            ratingValue: '='
        },
        template: `
        <div class="rating">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star star-zero"></i>
        </div>`
    };
});


// hiển thị số lượt truy cập
if (localStorage.getItem("visits") === null) {
    localStorage.setItem("visits", 1);
} else {
    localStorage.setItem("visits", parseInt(localStorage.getItem("visits")) + 1);
};

//nút top
var mybutton = document.getElementById("myBtn");
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//click vào hình thì hình tự phóng to
$("#selectedProduct").click(function () {
    $(this).toggleClass("active");
});




