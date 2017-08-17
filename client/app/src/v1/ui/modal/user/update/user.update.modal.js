(function () {
    'use strict';

	angular
		.module('wikiApp')
		.controller('UserEditCtrl',  UserEditCtrl);

	function UserEditCtrl($uibModalInstance, UsersDataService, user) {
		var vm = this;
		vm.save = save;
		vm.cancel = cancel;
		vm.user = {};
		vm.errorMessage = "";
		vm.tempUser = null;

		activate();

		function activate() {
			vm.user = user;
			vm.user.userRoleId = ""+vm.user.userRoleId;
			vm.tempUser = {};
			angular.copy(vm.user,vm.tempUser);
		}

		function save() {
 			vm.errorMessage = "";
 			UsersDataService.update (vm.tempUser).then(onSuccess,onFailure);

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
