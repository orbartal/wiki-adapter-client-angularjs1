(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('UsersCtrl', UsersCtrl);

    UsersCtrl.$inject = ['toaster', 'UsersResourcesService', 'UserTableConfigService'];

    function UsersCtrl (toaster, UsersResourcesService, UserTableConfigService) {
        var vm = this;
        vm.dataTable = [];
        vm.optionsTable = UserTableConfigService.getTableOptions();
        init();

        function init() {
             getAll();
        }

        function getAll () {
            UsersResourcesService.getAll().then(onSuccess, onFailure);
        	function onSuccess (users) {
                vm.dataTable = users;
          }
        	function onFailure (error) {
        		toaster.error({
        			title: 'Error',
	                body: 'Failed to get all users due to error: ' + error.message,
	            });
            }
        }//End getAll
    }
})();
