var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'food.html'
  })
  .when('/recipes', {
    templateUrl : 'recipes.html'
  })
  .when('/gotfood', {
    templateUrl : 'got_food.html',
    controller  : 'GotfoodController'
  })
  .otherwise({redirectTo: '/'});
});

app.controller('GotfoodController', function($scope) {
  $scope.onViewLoad = function() {
    loadSlides();
    showSlide(currentSlide());
//     initAutocomplete();
  }
});
