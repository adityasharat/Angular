(function (angular) {

    var Events = angular.module('Events');

    Events.controller('CreateEvent', function ($scope, $routeParams, EventsService, $location) {
        var EventResource = EventsService.getResource();

        $scope.initialize = function () {
            $scope.event = new EventResource(EventsService.getNew());
        };

        // if the route has a event id open the view in edit mode.
        // fetch the event from the server
        // display it in the view
        if ($routeParams.id) {
            $scope.event = EventResource.get({
                id : $routeParams.id
            });
        } else {
            $scope.initialize();
        }

        $scope.saveEvent = function () {
            $scope.event.$save($scope.initialize);
        };

        $scope.updateEvent = function () {
            $scope.event.$update($scope.initialize);
        };

        $scope.discardEvent = function () {
            $location.path('/allevents');
        };

        $scope.cancelEvent = function () {
            $scope.event.$delete($scope.initialize);
        };
    });

    Events.controller('AllEvents', function ($scope, EventsService) {

        $scope.events = EventsService.fetch();

        $scope.filters = {
            isCancelled : false
        };

        $scope.filterEvents = function (filters) {
            return function (event) {
                if (event.status.isCancelled && !filters.isCancelled) {
                    return false;
                }
                return true;
            };
        };
    });
}(angular));