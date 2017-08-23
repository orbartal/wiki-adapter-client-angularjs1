(function () {
    'use strict';

	angular
		.module('wikiApp')
		.controller('JobCreateCtrl',  JobCreateCtrl);

	function JobCreateCtrl ($scope, $uibModalInstance, JobsDataService) {
		var vm = this;
		vm.create = create;
		vm.cancel = cancel;
		vm.errorMessage = "";
		init();

		////////////////

		function init() {
				vm.job = {};
		}

		function create() {
 			vm.errorMessage = "";
 			JobsDataService.create(vm.job).then(onUpdateSuccess,onUpdateFailure);

			function onUpdateSuccess(){
				$uibModalInstance.close(vm.job);
			}

			function onUpdateFailure(error) {
				vm.errorMessage = error.message;
			}
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}

})();
