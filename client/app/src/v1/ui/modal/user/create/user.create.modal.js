(function () {
    'use strict';

	angular
		.module('wikiApp')
		.controller('UserCreateModalCtrl',  ['$uibModalInstance', 'UsersDataService', UserCreateModalCtrl]);

	function UserCreateModalCtrl($uibModalInstance, UsersDataService) {
		var vm = this;
		vm.create = create;
		vm.cancel = cancel;
		vm.user = {};
		vm.errorMessage = "";

		function create() {
 			vm.errorMessage = "";

 			UsersDataService.create (vm.user).then(onSuccess,onFailure);

			function onSuccess(){
				$uibModalInstance.close(vm.user);
			};

			function onFailure(error) {
				vm.errorMessage = error.data.message;
			};
		};

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		};
	}

})();
