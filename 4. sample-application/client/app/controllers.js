(function (angular) {

    var Events = angular.module('Events');

    Events.controller('CreateEvent', function ($scope, $routeParams, EventsService, $location) {
        var event,
            EventResource = EventsService.getResource();

        $scope.mode = 'Publish';

        // if the route has a event id open the view in edit mode.
        // fetch the event from the server
        // display it in the view
        if ($routeParams.id) {
            event = EventResource.get({
                id : $routeParams.id
            }).$promise.then(function (data) {
                $scope.mode = 'Update';   // change the text of the button to 'Edit event'
                $scope.event = data;
            });
        } else {
            $scope.event = EventsService.getNew();
            event = new EventResource($scope.event);
        }

        $scope.saveEvent = function () {

            if ($scope.event.id) {   // update is has id PUT
                EventResource
                    .update({id : $scope.event.id}, $scope.event)
                    .$promise.then(function () {
                        $scope.event = EventsService.getNew();
                        $scope.mode = 'Publish';
                        event = new EventResource($scope.event);
                    });
            } else {    // save if it has not id POST
                angular.extend(event, $scope.event);
                event.$save(function () {
                    $scope.event = EventsService.getNew();
                    event = new EventResource($scope.event);
                });
            }
        };

        $scope.discardEvent = function () {
            // add any clean up code if required
            $location.path('/allevents');
        };

        $scope.cancelEvent = function () {
            $scope.event.status = 'cancelled';
            $scope.saveEvent();
        };
    });

    Events.controller('AllEvents', function (EventsService) {
        EventsService.fetch();
    });
}(angular));