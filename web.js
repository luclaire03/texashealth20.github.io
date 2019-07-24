var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'food.html',
    controller  : 'HomeController'
  })
  .when('/recipes', {
    templateUrl : 'recipes.html',
    controller  : 'RecipeController'
  })
  .when('/gotfood', {
    templateUrl : 'got_food.html',
    controller  : 'GFController'
  })
  .otherwise({redirectTo: '/'});
});

app.controller('HomeController', function($scope, $http) {
  $scope.message = 'Hello from HomeController';
});
