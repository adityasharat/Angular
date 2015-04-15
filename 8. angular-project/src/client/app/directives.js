(function (angular, $) {

    var Events = angular.module('Events');

    Events.directive('header', function () {
        // Runs during compile
        return {
            name: 'header',
            // priority: 1,
            // terminal: true,
            scope: {
                view : '='
            },
            //controller: function ($scope, $element, $attrs, $transclude, $location) {},
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'templates/header.html',
            replace: true,
            transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                iElm.find('li[data-view=' + iAttrs.view + ']').addClass('active');
            }
        };
    });

    Events.directive('eventsBoardView', function () {
        // Runs during compile
        return {
            name: 'eventsBoardView',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            // controller: function ($scope, $element, $attrs, $transclude, EventsService, $timeout) {},
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            templateUrl: 'templates/events-board-view.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            // link: function($scope, iElm, iAttrs, controller) {}
        };
    });

    Events.directive('eventPageView', function () {
        // Runs during compile
        return {
            name: 'eventPageView',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            // controller: function ($rootScope, $scope, $location, $element, $attrs, $transclude) {},
            require: '^eventsBoardView', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            templateUrl: 'templates/event-page-view.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            // link: function($scope, iElm, iAttrs, controller) {}
        };
    });

    Events.directive('eventsTableView', function () {
        // Runs during compile
        return {
            name: 'eventsTableView',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            // controller: function ($scope, $element, $attrs, $transclude, EventsService, $timeout) {},
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            templateUrl: 'templates/events-table-view.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            // link: function($scope, iElm, iAttrs, controller) {}
        };
    });

    Events.directive('eventRowView', function () {
        // Runs during compile
        return {
            name: 'eventRowView',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            // controller: function ($rootScope, $scope, $location, $element, $attrs, $transclude) {},
            require: '^eventsTableView', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            templateUrl: 'templates/event-row-view.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            // link: function($scope, iElm, iAttrs, controller) {}
        };
    });

    Events.directive('datepair', function () {
        // Runs during compile
        return {
            name : 'datepair',
            // require : 'ngModel',
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            link: function ($scope, iElm, iAttrs, controller) {
                $(function () {
                    $(iElm).datepair();
                });
            }
        };
    });

    Events.directive('datepicker', function () {
        // Runs during compile
        return {
            name : 'datepicker',
            require : 'ngModel',
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            link: function ($scope, iElm, iAttrs, controller) {

                $(function () {
                    $(iElm).datepicker({
                        format: 'm/d/yyyy',
                        autoclose: true,
                    }).on('changeDate', function (event) {
                        $scope.$apply(function () {
                            controller.$setViewValue(event.date.toLocaleDateString());
                        });
                    });
                });
            }
        };
    });

    Events.directive('timepicker', function () {
        // Runs during compile
        return {
            name : 'timepicker',
            require : 'ngModel',
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            link: function ($scope, iElm, iAttrs, controller) {

                $(function () {
                    $(iElm).timepicker({
                        showDuration: true,
                        timeFormat: 'g:i A'
                    }).on('changeTime', function (event) {
                        $scope.$apply(function () {
                            controller.$setViewValue(event.target.value);
                        });
                    });
                });
            }
        };
    });

}(angular, $));