(function (angular) {

    var Events = angular.module('Events');

    Events.factory('EventsService', function ($resource, $q) {
        var resource = $resource('/data/events/:id', null, { update: { method: 'PUT' } }),
            deferred = $q.defer(),
            promise = deferred.promise,
            events = [];

        promise.resource = resource;

        promise.new = function () {
            return {
                title : '',
                startDate : '',
                startTime : '',
                endDate : '',
                endTime : '',
                host : '',
                location : ''
            };
        };

        promise.all = function () {
            return events;
        };

        promise.fetch = function () {
            resource.query().$promise.then(function (data) {
                events = data;
                deferred.notify(events);
            });
            return this;
        };

        promise.add = function (event) {
            var newEvent = new resource(event);

            newEvent.$save(function () {
                events.push(newEvent);
                deferred.notify(events);
            });

            return this;
        };

        return promise;
    });
}(angular));