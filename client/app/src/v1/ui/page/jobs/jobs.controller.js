﻿(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('JobsCtrl', JobsCtrl);

    JobsCtrl.$inject = ['$scope', 'toaster', 'JobsDataService', 'WikiUtils', 'JobTableConfigService'];

    function JobsCtrl ($scope, toaster, JobsDataService, WikiUtils, JobTableConfigService) {
        var vm = this;
        vm.allJobs = [];
        vm.displayJobs = [];
        vm.strCommand = "";

        vm.dataTable = [];
        vm.optionsTable = undefined;

        active();

        function active() {
            vm.optionsTable = JobTableConfigService.getTableOptions();
			getAllJobs();
            //TODO: fix
            /*
			$(document).ready(function(){
			    $('[data-toggle="tooltip"]').tooltip();
			});
            */
        }

        function getAllJobs() {
        	JobsDataService.getAll().then(onSuccess, onFailure);

        	function onSuccess (jobs) {
                vm.allJobs = jobs;
                vm.dataTable = jobs;
                for (var i = 0; i < vm.dataTable.length; i++) {
                    var job = vm.dataTable[i];
                    job.start = vm.getStartTime (job);
                    job.duration = vm.getStartTime (job);
                }
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
        	JobsDataService.end (job.id).then(onSuccess, onFailure);

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
        JobsDataService.create(vm.strCommand).then(onSuccess, onFailure);

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
