(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('UsersCtrl', UsersCtrl);

    UsersCtrl.$inject = ['TableUiService', 'UsersDataService', 'UserTableUiService'];
    function UsersCtrl (TableUiService, UsersDataService, UserTableUiService) {
        TableUiService.setConfig (this, UsersDataService, UserTableUiService);
    }
})();
