(function () {
    'use strict';

	angular
		.module('wikiApp')
		.controller('JobCreateModalCtrl',  ['$uibModalInstance', 'JobsDataService', JobCreateModalCtrl]);

	function JobCreateModalCtrl ($uibModalInstance, JobsDataService) {
		var vm = this;
		vm.create = create;
		vm.cancel = cancel;
		vm.errorMessage = "";
		init();

		function init() {
				vm.job = {};
		}

		function create() {
 			vm.errorMessage = "";
 			JobsDataService.create(vm.job).then(onSuccess,onFailure);

			function onSuccess(){
				$uibModalInstance.close(vm.job);
			}

			function onFailure(error) {
				vm.errorMessage = error.data.message;
			}
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}

})();
