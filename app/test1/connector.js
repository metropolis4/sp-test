'use strict';

angular.module('myApp.test1', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/test1', {
    templateUrl: 'test1/connector.html',
    controller: 'ConnectorCtrl'
  });
}]);
