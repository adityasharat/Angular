(function (angular) {
    var NotesApp = angular.module('NotesApp', ['ngResource']);

    NotesApp.factory('NotesService', function ($http, $resource, $q, $timeout) {
        var resource = $resource('data/notes.json');
        var deferred = $q.defer();
        var promise = deferred.promise;
        var notes;

        promise.getNotes = function () {
            if (notes) {
                return notes;
            }

            resource.query().$promise.then(function (data) {
                notes = data;
                deferred.notify(notes);
            });


            return this;
        };

        promise.addNotes = function (note) {
            notes.push(note);
            deferred.notify(notes);

            return this;
        };

        return promise;
    });

    NotesApp.controller('start', function ($scope, $rootScope, NotesService) {
        $scope.addNote = function () {
            if (!$scope.body || !$scope.title) {
                return;
            }

            NotesService.addNotes({
                body : $scope.body,
                title : $scope.title
            });

            $scope.body = '';
            $scope.title = '';
        };
    });

    NotesApp.directive('notes', function () {
        // Runs during compile
        return {
            name: 'notes',
            // priority: 1,
            // terminal: true,
            scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude, NotesService, $timeout) {
                NotesService.getNotes().then(null, null, function (notes) {
                    $scope.notes = notes;
                });
            },
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            //template: '<ul><note ng-repeat="note in notes"></note></ul>',
            templateUrl: 'templates/notes.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            // link: function($scope, iElm, iAttrs, controller) {}
        };
    });

    NotesApp.directive('note', function () {
        // Runs during compile
        return {
            name: 'note',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude) {
                var note = $scope.note;

                $scope.click = function ($event) {
                    // do stuff
                };
            },
            require: '^notes', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            //template: '<li ng-click="click($event)">Note = {{ note }}</li>',
            templateUrl: 'templates/note.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            // link: function($scope, iElm, iAttrs, controller) {}
        };
    });


}(angular));