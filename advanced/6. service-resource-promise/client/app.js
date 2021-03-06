(function (angular) {
    var NotesApp = angular.module('NotesApp', ['ngResource']);

    NotesApp.factory('NotesService', function ($resource, $q) {
        var resource = $resource('/data/notes/:id'),
            deferred = $q.defer(),
            promise = deferred.promise,
            notes = [];

        promise.fetch = function () {
            resource.query().$promise.then(function (data) {
                notes = data;
                deferred.notify(notes);
            });
            return this;
        };

        promise.all = function () {
            return notes;
        };

        promise.add = function (note) {
            var newNote = new resource(note);

            newNote.$save(function () {
                notes.push(newNote);
                deferred.notify(notes);
            });

            return this;
        };

        return promise;
    });

    NotesApp.controller('start', function ($rootScope, $scope, $rootScope, NotesService) {
        NotesService.fetch();

        $scope.addNote = function () {
            if (!$scope.body || !$scope.title) {
                return;
            }

            NotesService.add({
                body : $scope.body,
                title : $scope.title
            });

            $scope.body = '';
            $scope.title = '';
        };

        $rootScope.$on('edit-note', function (event, note) {
            $scope.body = note.body;
            $scope.title = note.title;
        });
    });

    NotesApp.directive('notes', function () {
        // Runs during compile
        return {
            name: 'notes',
            // priority: 1,
            // terminal: true,
            scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude, NotesService, $timeout) {
                $scope.notes = NotesService.all();
                NotesService.then(null, null, function (notes) {
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
            controller: function ($rootScope, $scope, $element, $attrs, $transclude) {
                $scope.click = function ($event) {
                    $rootScope.$emit('edit-note', $scope.note);
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