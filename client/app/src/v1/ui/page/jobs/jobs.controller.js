(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('JobsCtrl', JobsCtrl);

    JobsCtrl.$inject = ['JobsDataService', 'TableUiService','WikiUtils', 'JobTableUiService'];
    function JobsCtrl (JobsDataService, TableUiService, WikiUtils, JobTableUiService) {
        var vm = this;
        TableUiService.setConfig (this, JobsDataService, JobTableUiService, onSuccess);

        function onSuccess (jobs) {
            vm.dataTable = jobs;
            for (var i = 0; i < vm.dataTable.length; i++) {
                var job = vm.dataTable[i];
                job.start = WikiUtils.miliToHHmmss (job.startTime)
                job.duration = WikiUtils.getDurationTime (job.startTime, job.endTime);
            }
        }
    }//End JobsCtrl
})();
