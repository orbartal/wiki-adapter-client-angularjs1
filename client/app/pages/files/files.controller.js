(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('FilesCtrl', FilesCtrl);

    FilesCtrl.$inject = ['toaster', 'FilesResourcesService'];

    function FilesCtrl(toaster, FilesResourcesService) {
    	 var vm = this;
    	 vm.files = [];
         init();

         function init (){
        	  getAllFiles();
         }

         function getAllFiles (){
        	  FilesResourcesService.getAll().then(onSuccess, onFailure);

           	function onSuccess (files1) {
           		vm.files = files1;
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
