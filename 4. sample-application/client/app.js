(function (angular) {
    var Events = angular.module('Events', ['ngResource', 'ngRoute']);

    Events.config(function ($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/allevents', {
                templateUrl : 'pages/all-events.html',
                controller  : 'AllEvents'
            })
            .when('/createevent', {
                templateUrl : 'pages/create-event.html',
                controller  : 'CreateEvent'
            })
            .when('/editevent/:id', {
                templateUrl : 'pages/create-event.html',
                controller  : 'CreateEvent'
            })
            .otherwise({
                redirectTo: '/allevents'
            });
    });
}(angular));