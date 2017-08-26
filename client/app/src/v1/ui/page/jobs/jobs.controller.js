(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('JobsCtrl', JobsCtrl);

    JobsCtrl.$inject = ['JobsDataService', 'toaster','WikiUtils', 'JobTableUiService'];
    function JobsCtrl (JobsDataService, toaster, WikiUtils, JobTableUiService) {
        var vm = this;
        vm.dataTable = [];
        vm.optionsTable = null;
        init ();

        function init() {
            vm.optionsTable = JobTableUiService.getTableOptions();
			getAllJobs();
        }

        function getAllJobs() {
        	JobsDataService.getAll().then(onSuccess, onFailure);

        	function onSuccess (jobs) {
                vm.dataTable = jobs;
                for (var i = 0; i < vm.dataTable.length; i++) {
                    var job = vm.dataTable[i];
                    job.start = WikiUtils.miliToHHmmss (job.startTime)
                    job.duration = WikiUtils.getDurationTime (job.startTime, job.endTime);
                }
            }

        	function onFailure (error) {
        		toaster.error({
        			title: 'Error',
	                body: 'Failed to get jobs due to error: ' + error.message,
	            });
            }
        }//End getAllJobs
    }//End JobsCtrl
})();
