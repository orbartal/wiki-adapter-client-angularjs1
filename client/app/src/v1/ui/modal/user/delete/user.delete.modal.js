(function () {
    'use strict';

	angular
		.module('wikiApp')
		.controller('UserDeleteCtrl', UserDeleteCtrl);

	function UserDeleteCtrl($scope, $uibModalInstance, UsersDataService, user) {
		var vm = this;
		vm.user = null;
		vm.ok = ok;
		vm.cancel = cancel;
		vm.errorMessage = "";
		vm.user = user;


		function ok() {
			vm.errorMessage = "";

			UsersDataService.delete(user).then(onSuccess, onFailure);

			function onSuccess() {
				$uibModalInstance.close(user);
			}

			function onFailure(error) {
				vm.errorMessage = error.message;
			}
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}

})();
