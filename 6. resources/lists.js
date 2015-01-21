(function (angular) {

    /**
     * Application Module
     * The root module of the application
     */
    var ListsApp = angular.module('lists', ['ngResource']);

    ListsApp.factory('PersonsFactory', ['$resource',
        function ($resource) {
            var person;
            person = new $resource('persons.json');

            function query() {
                return person.query();
            }

            function _delete(id) {

            }

            function save(person) {

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

    ListsApp.controller('appCtrl', ['$scope', 'PersonsFactory',
        function ($scope, PersonsFactory) {
            this.title = "The Lists App"; // to check this see the title of the webpage
            this.person = {};
            this.list = PersonsFactory.query();

            this.deletePerson = function (index) {
                PersonsFactory.delete(index);
            };
            this.addPerson = function () {
                //checking form validations
                if ($scope.personForm.$invalid) { // if invalid then dont add the person
                    return;
                }
                PersonsFactory.save(this.person);
                this.person = {};
            };
        }
    ]);

}(angular));