(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('FilesCtrl', FilesCtrl);

    FilesCtrl.$inject = ['toaster', 'FilesDataService', 'FileTableConfigService'];

    function FilesCtrl(toaster, FilesDataService, FileTableConfigService) {
    	var vm = this;
		vm.options = {};
		vm.files = [];

		vm.dataTable = [];
        vm.optionsTable = {};


		init();

         function init (){

             vm.optionsTable =  FileTableConfigService.getTableOptions();
        	 getAllFiles();
         }

         function getAllFiles (){
        	  FilesDataService.getAll().then(onSuccess, onFailure);

           	function onSuccess (files1) {
           		vm.files = files1;
				vm.dataTable = files1;
            }

           	function onFailure (error) {
           		toaster.error({
           			title: 'Error',
   	                body: 'Failed to get files due to error: ' + error.message,
   	            });
            }
        }
    }
})();
