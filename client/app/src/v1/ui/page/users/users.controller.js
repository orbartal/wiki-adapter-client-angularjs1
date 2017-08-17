(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('UsersCtrl', UsersCtrl);

    UsersCtrl.$inject = ['toaster', 'UsersDataService', 'UserTableConfigService'];

    function UsersCtrl (toaster, UsersDataService, UserTableConfigService) {
        var vm = this;
        vm.dataTable = [];
        vm.optionsTable = UserTableConfigService.getTableOptions();
        init();

        function init() {
             getAll();
        }

        function getAll () {
            UsersDataService.getAll().then(onSuccess, onFailure);
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
