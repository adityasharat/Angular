(function (angular) {

    var Events = angular.module('Events');

    Events.factory('EventsService', function ($resource, $q) {
        var resource = $resource('/data/events/:id', {id : '@id'}, { update: { method: 'PUT' } }),
            deferred = $q.defer(),
            getPromise,
            getResource,
            getNew,
            fetch;

        getPromise = function () {
            return deferred.promise;
        };

        getResource = function () {
            return resource;
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
                status : { isNew : true, isCancelled : false, isPublished : false }
            };
        };

        fetch = function () {
            return resource.query();
        };

        return {
            getPromise : getPromise,
            getResource : getResource,
            getNew : getNew,
            fetch : fetch
        };
    });
}(angular));