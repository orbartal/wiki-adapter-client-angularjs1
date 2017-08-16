(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('JobsCtrl', JobsCtrl);

    JobsCtrl.$inject = ['$scope', 'toaster', 'JobsResourcesService', 'WikiUtils'];

    function JobsCtrl ($scope, toaster, JobsResourcesService, WikiUtils) {
        var vm = this;
        vm.allJobs = [];
        vm.displayJobs = [];
        vm.strCommand = "";
        active();

        function active() {
			getAllJobs();
            //TODO: fix
            /*
			$(document).ready(function(){
			    $('[data-toggle="tooltip"]').tooltip();
			});
            */
        }

        function getAllJobs() {
        	JobsResourcesService.getAll().then(onSuccess, onFailure);

        	function onSuccess (jobs) {
                vm.allJobs = jobs;
            }

        	function onFailure (error) {
        		toaster.error({
        			title: 'Error',
	                body: 'Failed to get jobs due to error: ' + error.message,
	            });
            }
        }

        vm.getStartTime = function(job) {
        	return WikiUtils.miliToHHmmss (job.startTime);
        }

        vm.getDuration = function(job) {
        	return WikiUtils.getDurationTime (job.startTime, job.endTime);
        }

        vm.getData = function(job) {
        	var data = {jobId: job.id};
        	return data;
        }

        vm.getOptions = function(job) {
        	var options = {hideText: true, title: job.title};
        	return options;
        }

        vm.stop = function(job) {
        	JobsResourcesService.end (job.id).then(onSuccess, onFailure);

        	function onSuccess (jobs) {
        		var jobs = vm.allJobs.filter(function( t ) {
        		    return t.id !== jobId;
        		});
        		vm.allJobs =  jobs;
            }

        	function onFailure (error) {
        		toaster.error({
        			title: 'Error',
	                body: 'Failed to get jobs due to error: ' + error.message,
	            });
            }
        }

        vm.addNewJob = function() {
        JobsResourcesService.create(vm.strCommand).then(onSuccess, onFailure);

        	function onSuccess (job) {
        		getAllJobs();
            }

        	function onFailure (error) {
        		toaster.error({
        			title: 'Error',
	                body: 'Failed to create new job due to error: ' + error.message,
	            });
            }
        }
    }
})();
