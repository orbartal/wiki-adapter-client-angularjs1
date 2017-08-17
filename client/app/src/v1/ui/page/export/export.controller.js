(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('ExportCtrl', ExportCtrl);

    ExportCtrl.$inject = ['SiteConfigService', 'JobsDataService', '$scope'];

    function ExportCtrl(SiteConfigService, JobsDataService, $scope) {
        var vm = this;
        vm.arrSourcesTypes = null;
        vm.selectedSourceType = null;
        vm.fileData = null;
        vm.exportData = exportData;
        vm.stop = stop;

        init();

        function init() {
        	setSettings ();
        	vm.progress = getProgress();
        	vm.arrSourcesTypes = getSourcesTypes ();
        }

        function getSourcesTypes (){
			var sourcesTypes = [];
			var localFile = {id:1, name:'localFile'};
			sourcesTypes.push(localFile);
			return sourcesTypes;
		}

        function getProgress(){
        	var progress = {};
        	progress.options = {title: "Task export pages"};
        	progress.data = {taskId: -1};
        	return progress;
        }

        function setSettings (){
        	vm.language = SiteConfigService.config.mapLanguage;
        	vm.message = "Ready to start export";
        	vm.classBtnExport = ["btn", "btn-primary", "class-right", "class-button-margin"];
        }

        function exportData (){
        	vm.isBusy = true;
        	JobsDataService.start("ExportToFile", vm.fileData).then(onSuccess, onFailure);

        	function onSuccess (data) {
        		vm.message = "Start to export data into wiki";
        		vm.progress.data.taskId = data;
        		vm.progress.data.finished = false;

        		$scope.$watch('vm.progress.data.finished', function(newValue, oldValue) {
          		   if (newValue==true){
          			 vm.message = "Finished to export data into wiki";
          			 vm.isBusy = false;
          		   }
        		});
            }

        	function onFailure (error) {
        		vm.message = 'Failed to start new export task due to error: ' + error.message;
        		vm.isBusy = false;
            }
        }

        function stop (){
        	JobsDataService.end(vm.progress.data.taskId).then(onSuccess, onFailure);

        	function onSuccess (data) {
        		vm.message = "Stop export data into wiki";
        		vm.progress.data.finished = true;
        		vm.isBusy = false;
            }

        	function onFailure (error) {
        		vm.message = 'Failed to start new export task due to error: ' + error.message;
            }
        }
    }
})();
