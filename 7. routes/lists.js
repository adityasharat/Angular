(function (angular) {
    /**
     * Application Module
     * The root module of the application
     */
    var ListsApp = angular.module('lists', ['ngResource', 'ngRoute']);

    ListsApp.config(function ($routeProvider) {
        $routeProvider
            .when('/persons', {
                templateUrl: 'list-persons.tpl.html',
            })
            .when('/persons/create', {
                templateUrl: 'create-person.tpl.html',
            })
            .otherwise({
                redirectTo: '/persons'
            });
    });

    ListsApp.factory('PersonsFactory', ['$resource',
        function ($resource) {
            var person, list;
            person = new $resource('persons.json');

            function query() {
                // since we cant write files
                // lets save in memory
                if (list) {
                    return list;
                }
                list = person.query();
                return list;
            }

            function _delete(id) {
                list.splice(id, 1);
            }

            function save(person) {
                list.push(person);
            }

            return {
                query: query,
                delete: _delete,
                save: save
            };
        }
    ]);

    ListsApp.directive('listsNumber', function () {
        return {
            name: 'listsNumber',
            require: 'ngModel',
            restrict: 'E',
            template: '<input type="number" required/>',
            replace: true
        };
    });

    ListsApp.controller('appCtrl', function () {
        this.title = "The Lists App"; // to check this see the title of the webpage
    });

    ListsApp.controller('PersonsListCtrl', ['PersonsFactory',
        function (PersonsFactory) {
            this.list = PersonsFactory.query();
            this.deletePerson = function (index) {
                PersonsFactory.delete(index);
            };
        }
    ]);

    ListsApp.controller('CreatePersonCtrl', ['$scope', 'PersonsFactory',
        function ($scope, PersonsFactory) {
            this.person = {};
            this.addPerson = function () {
                //checking form validations
                if ($scope.personForm.$invalid) { // if invalid then dont add the person
                    return;
                }
                PersonsFactory.save(this.person);
                this.person = {};
            };

            PersonsFactory.query();
        }
    ]);
}(angular));