(function () {
    'use strict';

	angular
		.module('wikiApp')
		.controller('FileCreateModalCtrl', ['$uibModalInstance', 'Upload', FileCreateModalCtrl]);

	function FileCreateModalCtrl ($uibModalInstance, Upload) {
		var vm = this;
		vm.errorMessage = "";
		vm.file = undefined;
		vm.name = undefined;

		vm.setSelectedFile = setSelectedFile;
        vm.uploadFile = uploadFile;
        vm.cancel = cancel;

        function setSelectedFile (fileContent, errFiles){
        	vm.fileContent = fileContent;
        }

        function uploadFile() {
        	processFile();
        	vm.errorMessage = "";
        	var args = {url: "/files/upload", data: {file: vm.file}};
        	var params = {name : vm.file.name};
        	vm.file.upload =Upload.upload(args, params);
        	vm.file.upload.then (onSuccess, onFailed);

        	 function onSuccess(response) {
        		 $uibModalInstance.dismiss('success');
            }

            function onFailed(error) {
            	vm.errorMessage = "File upload has failed: " + error;
                throw error;
            }

            function processFile (){
            	if (!vm.file){
            		return;
            	}
            	var arrTypes = vm.file.type.split('/');
            	vm.file.type1=arrTypes[0];
            	vm.file.type2=arrTypes[1];
            }
		}

		function cancel () {
			$uibModalInstance.dismiss('cancel');
		}
	}
})();
