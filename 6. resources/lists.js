(function (angular) {

    /**
     * Application Module
     * The root module of the application
     */
    var ListsApp = angular.module('lists', []);

    ListsApp.factory('ListFactory', function () {
        var list = [];

        function query() {
            return list;
        }

        function add(item) {
            list.push(item);
            return list;
        }

        function remove(index) {
            list.splice(index, 1);
            return list;
        }

        return {
            query: query,
            add: add,
            remove: remove
        };
    });

    ListsApp.directive('listsNumber', function () {
        return {
            name: 'listsNumber',
            require: 'ngModel',
            restrict: 'E',
            template: '<input type="number" required/>',
            replace: true
        };
    });

    ListsApp.controller('appCtrl', ['$scope', 'ListFactory',
        function ($scope, ListFactory) {
            this.title = "The Lists App"; // to check this see the title of the webpage
            this.person = {};
            this.list = ListFactory.query();
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