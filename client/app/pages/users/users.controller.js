(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('UsersCtrl', UsersCtrl);

    UsersCtrl.$inject = ['$scope', '$uibModal', 'toaster', 'UsersResourcesService'];

    function UsersCtrl($scope, $uibModal, toaster, UsersResourcesService) {
        var vm = this;
        vm.allUsers = [];
		    vm.displayUsers = [];

        vm.getAll = getAll;
        vm.delete = openDeleteUserDialog;
        vm.edit = openEditUserDialog;
        vm.create = openCreateNewUserDialog;
        init();

        function init() {
             vm.getAll();
        }

        //////////////
        // Get all //
        /////////////
        function getAll () {
          var promise = UsersResourcesService.getAll();
        	promise.then(onSuccess, onFailure);
        	function onSuccess (users) {
                vm.allUsers = users;
          }
        	function onFailure (error) {
        		toaster.error({
        			title: 'Error',
	                body: 'Failed to get all users due to error: ' + error.message,
	            });
            }
        }//End getAll

        ///////////////
        //  delete  //
        /////////////
        function openDeleteUserDialog (selectedUser) {
            var modalInstance = $uibModal.open({
          		backdrop : 'static',
      				size: "lg",
      				templateUrl: '/app/pages/users/delete-user/delete.user.view.html',
      				controller: "UserDeleteCtrl as vm",
      				resolve: {
      					user: function(){
      						return selectedUser;
      					}
      				}
      			});

            modalInstance.result.then(onConfirm, onCancel);

      			function onConfirm(data){
      				modalInstance.close();
      				toaster.success({
      					title: "Delete user successfully",
      					body:"username="+data.userName
      				});
      			}

  			function onCancel (data){}
    }
        function openEditUserDialog (user) {}
        function openCreateNewUserDialog (user) {}

    }
})();
