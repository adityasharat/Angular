(function (angular, $) {

    var Events = angular.module('Events');

    Events.directive('header', function () {
        // Runs during compile
        return {
            name: 'header',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: function($scope, $element, $attrs, $transclude) {},
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'templates/header.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            //link: function($scope, iElm, iAttrs, controller) {}
        };
    });

    Events.directive('events', function () {
        // Runs during compile
        return {
            name: 'events',
            // priority: 1,
            // terminal: true,
            //scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude, EventsService, $timeout) {
                $scope.events = EventsService.all();
                EventsService.then(null, null, function (events) {
                    $scope.events = events;
                });
            },
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            templateUrl: 'templates/events.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            // link: function($scope, iElm, iAttrs, controller) {}
        };
    });

    Events.directive('event', function () {
        // Runs during compile
        return {
            name: 'event',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: function ($rootScope, $scope, $location, $element, $attrs, $transclude) {
                $scope.click = function () {
                    $location.path('editevent/' + $scope.event.id);
                };
            },
            require: '^events', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            templateUrl: 'templates/event.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            // link: function($scope, iElm, iAttrs, controller) {}
        };
    });

    Events.directive('timerange', function () {
        // Runs during compile
        return {
            name : 'timerange',
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            link: function($scope, iElm, iAttrs, controller) {
                var $element = $(iElm);

                var time = $element.find('.time').timepicker({
                    showDuration: true,
                    timeFormat: 'g:i A'
                });

                $element.find('.date').datepicker({
                    format: 'm/d/yyyy',
                    autoclose: true
                });

                $element.datepair();
            }
        };
    });
}(angular, $));