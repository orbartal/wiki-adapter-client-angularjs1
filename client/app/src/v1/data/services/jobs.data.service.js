(function () {
    'use strict';

    angular
        .module('wikiApp')
        .factory('JobsDataService', JobsDataService);

    JobsDataService.$inject = ['$q', 'PageUtils'];
    function JobsDataService($q, PageUtils) {
        var service = {};
        service.getProgress = getProgress;
        service.start = start;
        service.create = create;
        service.getAll = getAll;
        service.end = end;
        return service;

        //public methods
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

        function getAll(page) {
            var job1 = {"id" : 1, "value" : 50, "startTime" : 100, "endTime": 200, "title" : "job1"};
            var job2 = {"id" : 2, "value" : 20, "startTime" : 150, "endTime": 240, "title" : "job2"};
            var job3 = {"id" : 3, "value" : 70, "startTime" : 50, "endTime": 300, "title" : "job3"};
            var jobs = [job1, job2, job3];
            var result = PageUtils.arrayToPage(jobs, page);
            return $q.when(result);
        }

        //private functions
        function onSuccess(result) {
        	return result;
        }

        function onFailure(error) {
            throw error;
        }
    }

})();
