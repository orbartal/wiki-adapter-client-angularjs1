(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('UserTableUiService', UserTableUiService);

    UserTableUiService.$inject = ['TableUiService', 'UserButtonUiService'];
    function UserTableUiService(TableConfig, UserButton) {
        var service = {};
        service.makeCell = TableConfig.makeCell;
        service.getColumns = getColumns;
        service.getTableOptions = getTableOptions;
        return service;

        function getTableOptions (){
            return TableConfig.getOptions (service, UserButton);
        }

        function getColumns (){
             return TableConfig.geteColsDesc (["id", "name", "role"]);
        }//End getColumns
    }
})();
