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
            return person;
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
                //this.list.splice(index, 1);
                ListFactory.remove(index);
            };
            this.addPerson = function () {
                //checking form validations
                if ($scope.personForm.$invalid) { // if invalid then dont add the person
                    return;
                }
                ListFactory.add(this.person);
                this.person = {};
            };
        }
    ]);

}(angular));