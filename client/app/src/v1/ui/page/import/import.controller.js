(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('ImportCtrl', ImportCtrl);

    ImportCtrl.$inject = ['LanguageConfigService', 'JobsDataService', '$scope'];

    function ImportCtrl(language, JobsDataService, $scope) {
        var vm = this;
        vm.arrSourcesTypes = null;
        vm.selectedSourceType = null;
        vm.wikiData = null;
        vm.fileData = null;
        vm.folderData = null;

        vm.importData = importData;
        vm.stop = stop;

        init();

        function init() {
        	setSettings ();
        	vm.progress = getProgress();
        	vm.arrSourcesTypes = getSourcesTypes ();
        }

        function getSourcesTypes (){
			var sourcesTypes = [];
			var wiki = {id:1, name:'Wiki'};
			var localFile = {id:2, name:'LocalFile'};
			var localFolder = {id:3, name:'LocalFolder'};
			sourcesTypes.push(wiki);
			sourcesTypes.push(localFile);
			sourcesTypes.push(localFolder);
			return sourcesTypes;
		}

        function getProgress(){
        	var progress = {};
        	progress.options = {};
        	progress.options.title = "Job import pages";
        	progress.data = {};
        	progress.data.jobId = -1;
        	return progress;
        }

        function setSettings (){
        	vm.language = language.getMap(['importPages', 'import']);
        	vm.message = "Ready to start import";
        	vm.classBtnImport = ["btn", "btn-primary", "class-right", "class-button-margin"];
        }

        function importData (){
        	vm.isBusy = true;
        	var index = vm.selectedSourceType-1;
        	var importSource = vm.arrSourcesTypes[index];
        	var jobTitle = "ImportFrom" + importSource['name'];
        	var jobDetails = getInputData();
        	JobsDataService.start(jobTitle, jobDetails).then(onSuccess, onFailure);

        	function onSuccess (data) {
        		vm.message = "Start to imported data into wiki";
        		vm.progress.data.jobId = data;
        		vm.progress.data.finished = false;

        		$scope.$watch('vm.progress.data.finished', function(newValue, oldValue) {
          		   if (newValue==true){
          			 vm.message = "Finished to import data into wiki";
          			 vm.isBusy = false;
          		   }
        		});
            }

        	function onFailure (error) {
        		vm.message = 'Failed to start new import job due to error: ' + error.message;
        		vm.isBusy = false;
            }

        	function getInputData (){
        		if (vm.selectedSourceType==1){
        			return vm.wikiData;
        		}else if (vm.selectedSourceType==2){
        			return vm.fileData;
        		}else if (vm.selectedSourceType==3){
        			return vm.folderData;
        		}
        		return "Unknown source type";
        	}
        }

        function stop (){
        	JobsDataService.end(vm.progress.data.jobId).then(onSuccess, onFailure);

        	function onSuccess (data) {
        		vm.message = "Stop import data into wiki";
        		vm.progress.data.finished = true;
        		vm.isBusy = false;
            }

        	function onFailure (error) {
        		vm.message = 'Failed to start new export job due to error: ' + error.message;
            }
        }
    }
})();
