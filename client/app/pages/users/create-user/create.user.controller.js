(function () {
    'use strict';

	angular
		.module('wikiApp')
		.controller('UserCreateCtrl',  UserCreateCtrl);

	function UserCreateCtrl($uibModalInstance, UsersService) {
		var vm = this;
		vm.create = create;
		vm.cancel = cancel;
		vm.user = {};
		vm.errorMessage = "";

		function create() {
 			vm.errorMessage = "";

 			UsersService.createNewUser(vm.user).then(onSuccess,onFailure);

			function onSuccess(){
				$uibModalInstance.close(vm.user);
			};

			function onFailure(error) {
				vm.errorMessage = error.message;
			};
		};

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		};
	}

})();
