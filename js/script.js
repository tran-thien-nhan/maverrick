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
    // modal
    $scope.showProduct = function(product) {
        $location.path('/detail').search({product: product});
    };

    $scope.filterProducts = function (filterType) {
        $scope.searchTerm = filterType;
    };
});

app.controller('DetailController', function($scope, $location) {
    $scope.product = $location.search().product;
});

app.controller('myController', function ($scope, $http, $location) {

    $scope.cart = [];

    $scope.addToCart = function (product) {
        $scope.cart.push(product);
        $scope.total();
    }

    $scope.cart = [];

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

    $scope.buy = function () {
        // Add implementation for processing the payment
        // let paymentOption = document.querySelector('input[name="payment_option"]:checked');
        // if (!paymentOption) {
        //     alert('Thank you !');
        // };
        // alert('Thank you !');
    };

    $scope.placeOrder = function () {
        let paymentOption = document.querySelector('input[name="payment_option"]:checked');
        if (!paymentOption) {
            alert('Please choose payment option !');
        }
        else {
            alert('Thank you !');
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

app.directive('ratingStar', function () {
    return {
        scope: {
            ratingValue: '='
        },
        template: `
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>`
    };
});


// hiển thị số lượt truy cập
if (localStorage.getItem("visits") === null) {
    localStorage.setItem("visits", 1);
} else {
    localStorage.setItem("visits", parseInt(localStorage.getItem("visits")) + 1);
};

// hiển thị ngày, giờ, vị trí
const tickerContainer = document.createElement('div');
tickerContainer.style.textAlign = 'center';
document.body.appendChild(tickerContainer);

const ticker = document.createElement('div');
ticker.style.position = 'fixed';
ticker.style.bottom = 0;
ticker.style.left = 0;
ticker.style.right = 0;
ticker.style.backgroundColor = '#D19C97';
ticker.style.color = 'black';
ticker.style.fontWeight = 'bolder';
ticker.style.padding = '10px';
ticker.style.overflow = 'hidden';
ticker.style.whiteSpace = 'nowrap';
ticker.style.animation = 'scroll-left 10s linear infinite';
ticker.style.textAlign = 'center';
ticker.style.opacity = '0.7';
ticker.style.width = 'fit-content';
ticker.style.display = 'flex';
ticker.style.margin = 'auto';
ticker.style.borderRadius = '2rem';
ticker.style.marginBottom = '0.5rem';
ticker.style.display = 'none';
document.body.appendChild(ticker);

const updateTicker = () => {
    let date = new Date();
    let dateString = date.toLocaleDateString();
    let timeString = date.toLocaleTimeString();
    ticker.innerHTML = `${dateString}, ${timeString} <br>391a Nam Kỳ Khởi Nghĩa, phường 14, Quận 3`;
};

const button = document.createElement('button');
button.innerHTML = 'Info';
button.style.position = 'fixed';
button.style.bottom = 0;
button.style.left = 0;
button.style.backgroundColor = '#D19C97';
button.style.color = 'black';
ticker.style.fontWeight = 'bolder';
button.style.padding = '10px';
button.style.overflow = 'hidden';
button.style.whiteSpace = 'nowrap';
button.style.animation = 'scroll-left 10s linear infinite';
button.style.textAlign = 'center';
button.style.opacity = '0.7';
button.style.width = 'fit-content';
button.style.display = 'flex';
button.style.margin = 'auto';
button.style.borderRadius = '2rem';
button.style.marginBottom = '0.5rem';
document.body.appendChild(button);

let isInfoDisplayed = false;

button.addEventListener('click', () => {
    if (!isInfoDisplayed) {
        let date = new Date();
        let dateString = date.toLocaleDateString();
        let timeString = date.toLocaleTimeString();
        button.style.opacity = 0;
        setTimeout(() => {
            button.innerHTML = `${dateString}, ${timeString} <br>391a Nam Kỳ Khởi Nghĩa, phường 14, Quận 3`;
            button.style.transition = 'all 0.5s ease-in';
            button.style.opacity = 1;
        }, 500);
        isInfoDisplayed = true;
    } else {
        button.style.opacity = 0;
        setTimeout(() => {
            button.innerHTML = 'Info';
            button.style.transition = 'all 0.5s ease-out';
            button.style.opacity = 0.6;
        }, 500);
        isInfoDisplayed = false;
    }
});

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
