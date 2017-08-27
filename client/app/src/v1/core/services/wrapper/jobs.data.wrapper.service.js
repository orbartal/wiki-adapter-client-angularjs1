(function () {
    'use strict';

    angular
        .module('wikiApp')
        .factory('JobsDataWrapperService', JobsDataWrapperService);

    JobsDataWrapperService.$inject = ['JobsDataService', 'WikiUtils'];
    function JobsDataWrapperService(JobsDataService, WikiUtils) {
        var service = {};
        angular.copy(JobsDataService, service)
        service.getAll = getAll;
        return service;


        function getAll(page) {
            return JobsDataService.getAll(page).then(onSuccess, onFailure);

            function onSuccess(page) {
                var jobs = page.content;
                for (var i = 0; i < jobs.length; i++) {
                    var job = jobs[i];
                    job.start = WikiUtils.miliToHHmmss (job.startTime)
                    job.duration = WikiUtils.getDurationTime (job.startTime, job.endTime);
                }
            	return page;
            }

            function onFailure(error) {
                throw error;
            }
        }
    }

})();
