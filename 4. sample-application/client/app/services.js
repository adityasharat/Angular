(function (angular) {

    var Events = angular.module('Events');

    Events.factory('EventsService', function ($resource, $q) {
        var resource = $resource('/data/events/:id', {id : '@id'}, { update: { method: 'PUT' } }),
            deferred = $q.defer(),
            events = [],
            getPromise,
            getResource,
            all,
            getNew,
            fetch,
            add;

        getPromise = function () {
            return deferred.promise;
        };

        getResource = function () {
            return resource;
        };

        all = function () {
            return events;
        };

        getNew = function () {
            return {
                title : '',
                startDate : new Date().toLocaleDateString(),
                startTime : '12:00 AM',
                endDate : new Date().toLocaleDateString(),
                endTime : '1:00 AM',
                host : '',
                location : '',
                status : { isNew : true }
            };
        };

        fetch = function () {
            resource.query().$promise.then(function (data) {
                events = data;
                deferred.notify(events);
            });
            return this;
        };

        add = function (event) {
            var newEvent = new resource(event);

            newEvent.$save(function () {
                events.push(newEvent);
                deferred.notify(events);
            });

            return this;
        };

        return {
            getPromise : getPromise,
            getResource : getResource,
            all : all,
            getNew : getNew,
            fetch : fetch,
            add : add
        };
    });
}(angular));