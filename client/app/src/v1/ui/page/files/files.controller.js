(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('FilesCtrl', FilesCtrl);

    FilesCtrl.$inject = ['toaster', 'FilesDataService', 'FileTableUiService'];
    function FilesCtrl(toaster, FilesDataService, FileTableUiService) {
    	var vm = this;
		vm.dataTable = [];
        vm.optionsTable = null;
		init();

         function init (){
             vm.optionsTable =  FileTableUiService.getTableOptions();
             getAllFiles ();
         }

         function getAllFiles (){
        	  FilesDataService.getAll().then(onSuccess, onFailure);

              function onSuccess (files1) {
                  vm.dataTable = files1;
              }

              function onFailure (error) {
                  toaster.error({
                      title: 'Error',
                      body: 'Failed to get files due to error: ' + error.message,
                  });
             }
         }//End getAllFiles
    }//End FilesCtrl
})();
