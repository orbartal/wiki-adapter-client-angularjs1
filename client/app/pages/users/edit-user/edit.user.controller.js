(function () {
    'use strict';

	angular
		.module('wikiApp')
		.controller('UserEditCtrl',  UserEditCtrl);

	function UserEditCtrl($uibModalInstance, UsersService, user) {
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
 		//	delete  vm.tempUser.confirmPassword;
 		//	delete  vm.tempUser.role;
 			//delete  vm.userRoleId.roleId;
 			debugger;
 			UsersService.updateUser(vm.tempUser).then(onSuccess,onFailure);

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
