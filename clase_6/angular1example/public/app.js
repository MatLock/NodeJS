"use strict";
var services = angular.module('services', []);
var directives = angular.module('directives', []);

var app = angular.module('angularApp', ['ngRoute', 'controllers', 'services']);

var port = window.location.port;
services.constant('api', 'http://' + window.location.hostname + (port == '' ? '' : ':' + port) + '/service');

var controllers = angular.module('controllers', ['services', 'ui-notification']);



app.config(['$routeProvider', '$locationProvider', "$httpProvider", function ($routeProvider, $locationProvider, $httpProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider.when('/search', {
		templateUrl: 'pages/search.html',
		resolve: {}
	});

	$routeProvider.when('/', {
		templateUrl: '/pages/home.html',
		resolve: {}
	});

	$routeProvider.when('/about', {
		templateUrl: '/pages/about.html'
	});


	$routeProvider.when('/404', {
		templateUrl: '/pages/404.html'
	});


	$routeProvider.otherwise({redirectTo: '/'});



}]);
