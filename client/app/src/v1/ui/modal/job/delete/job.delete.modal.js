(function () {
    'use strict';

	angular
		.module('wikiApp')
		.controller('ModalDeleteJobCtrl', ModalDeleteJobCtrl);

	function ModalDeleteJobCtrl ($scope, $uibModalInstance, JobsDataService, job) {
		var vm = this;
		vm.article = null;
		vm.ok = ok;
		vm.cancel = cancel;
		vm.errorMessage = "";
		activate();

		////////////////

		function activate() {
			vm.job = job;
		}

		function ok() {

			vm.errorMessage = "";

			JobsDataService.end(job).then(onDeleteSuccess,onDeleteFailure);

			function onDeleteSuccess() {
				$uibModalInstance.close(vm.job);
			};

			function onDeleteFailure(error) {
				vm.errorMessage = error.message;
			};
		};

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		};
	}

})();
