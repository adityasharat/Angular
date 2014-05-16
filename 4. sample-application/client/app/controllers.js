(function (angular) {

    var Events = angular.module('Events');

    Events.controller('CreateEvent', function ($scope, $routeParams, EventsService, $location) {
        var EventResource = EventsService.getResource();

        // if the route has a event id open the view in edit mode.
        // fetch the event from the server
        // display it in the view
        if ($routeParams.id) {
            $scope.event = EventResource.get({
                id : $routeParams.id
            });
        } else {
            $scope.event = new EventResource(EventsService.getNew());
        }

        $scope.saveEvent = function () {

            if ($scope.event.id) {   // update is has id PUT
                $scope.event.$update(function () {
                    $scope.event = new EventResource(EventsService.getNew());
                });
            } else {
                $scope.event.$save(function () {
                    $scope.event = new EventResource(EventsService.getNew());
                });
            }
        };

        $scope.discardEvent = function () {
            // add any clean up code if required
            $location.path('/allevents');
        };

        $scope.cancelEvent = function () {
            $scope.event.$delete(function () {
                $scope.event = new EventResource(EventsService.getNew());
            });
        };
    });

    Events.controller('AllEvents', function (EventsService) {
        EventsService.fetch();
    });
}(angular));