(function () {
    'use strict';

    angular
        .module('wikiApp')
        .factory('JobsResourcesService', JobsResourcesService);

    JobsResourcesService.$inject = ['$q', 'toaster', 'SiteConfigService'];
    function JobsResourcesService($q, toaster, SiteConfigService) {
        var service = {};

        //Crud
        service.getProgress = getProgress;
        service.start = start;
        service.create = create;
        service.getAll = getAll;
        service.end = end;

        return service;

        ///////////////////////////
        function getProgress(id) {
            var result = {"id" : id, "value" : 50,  "startTime" : 100, "endTime": 200, "title" : "job1"};
            return $q.when(result);
        }

        function start (title, details) {
            var result = {"id" : 1, "value" : 50, "startTime" : 100, "endTime": 200, "title" : title};
            return $q.when(result);
        }

        function create (command) {
            var result = {"id" : 1, "value" : 50, "startTime" : 100, "endTime": 200, "title" : "job1"};
            return $q.when(result);
        }

        function end(id) {
            var result = {"id" : id, "value" : 50, "startTime" : 100, "endTime": 200, "title" : "job1"};
            return $q.when(result);
        }

        function getAll() {
            var job1 = {"id" : 1, "value" : 50, "startTime" : 100, "endTime": 200, "title" : "job1"};
            var job2 = {"id" : 2, "value" : 20, "startTime" : 150, "endTime": 240, "title" : "job2"};
            var job3 = {"id" : 3, "value" : 70, "startTime" : 50, "endTime": 300, "title" : "job3"};
            var results = [job1, job2, job3];
            return $q.when(results);
        }

     // private functions
        function onSuccess(result) {
        	return result.data;
        }

        function onFailure(error) {
            throw error.data;
        }
    }

})();
