(function (angular) {
    var NotesApp = angular.module('NotesApp', ['ngResource', 'ngRoute']);

    NotesApp.config(function ($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/allnotes', {
                templateUrl : 'pages/all-notes.html',
                controller  : 'AllNotes'
            })
            .when('/createnote', {
                templateUrl : 'pages/create-note.html',
                controller  : 'CreateNote'
            })
            .when('/editnote/:noteid', {
                templateUrl : 'pages/create-note.html',
                controller  : 'CreateNote'
            })
            .otherwise({
                redirectTo: '/allnotes'
            });
    });

    NotesApp.factory('NotesService', function ($resource, $q) {
        var resource = $resource('/data/notes/:id'),
            deferred = $q.defer(),
            promise = deferred.promise,
            notes = [];

        promise.resource = resource;

        promise.all = function () {
            return notes;
        };

        promise.fetch = function () {
            resource.query().$promise.then(function (data) {
                notes = data;
                deferred.notify(notes);
            });
            return this;
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

    NotesApp.controller('CreateNote', function ($rootScope, $scope, $routeParams, NotesService) {
        var note;;

        $scope.mode = 'Add';

        // if the route has a note id open the view in edit mode.
        // fetch the note from the server
        // display it in the view
        if ($routeParams.noteid) {
            note = new NotesService.resource()

            note.$get({
                id : $routeParams.noteid
            }).then(function (data) {
                $scope.mode = 'Edit';   // change the text of the button to 'Edit Note'
                $scope.note = data;
            });
        }


        $scope.saveNote = function () {
            if (!$scope.note.body || !$scope.note.title) {
                return;
            }

            if ($scope.note.id) {
                $scope.note.$save().then(function (data) {
                    console.log(data);
                    $scope.note.body = '';
                    $scope.note.title = '';
                });
            } else {
                NotesService.add({
                    body : $scope.note.body,
                    title : $scope.note.title
                });
            }

        };
    });

    NotesApp.controller('AllNotes', function ($scope, NotesService) {
        NotesService.fetch();
    });

    NotesApp.directive('header', function () {
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

    NotesApp.directive('notes', function () {
        // Runs during compile
        return {
            name: 'notes',
            // priority: 1,
            // terminal: true,
            //scope: {}, // {} = isolate, true = child, false/undefined = no change
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
            controller: function ($rootScope, $scope, $location, $element, $attrs, $transclude) {
                $scope.click = function () {
                    $location.path('editnote/' + $scope.note.id);
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