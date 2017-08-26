(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('UserTableConfigService', UserTableConfigService);

    UserTableConfigService.$inject = ['TableConfigService', 'UserButtonConfigService'];
    function UserTableConfigService(TableConfig, UserButton) {
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
