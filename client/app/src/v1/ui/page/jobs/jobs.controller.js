(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('JobsCtrl', JobsCtrl);

    JobsCtrl.$inject = ['JobsDataService', 'TableUiService','WikiUtils', 'JobTableUiService'];
    function JobsCtrl (JobsDataService, TableUiService, WikiUtils, JobTableUiService) {
        var vm = this;
        TableUiService.setConfig (this, JobsDataService, JobTableUiService);
        //TODO:add onSuccess
        function onSuccess (jobs) {
            for (var i = 0; i < jobs.length; i++) {
                var job = vm.dataTable[i];
                job.start = WikiUtils.miliToHHmmss (job.startTime)
                job.duration = WikiUtils.getDurationTime (job.startTime, job.endTime);
            }
            vm.dataTable = jobs;
        }
    }//End JobsCtrl
})();
