(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('UserTableConfigService', UserTableConfigService);

    UserTableConfigService.$inject = ['TableConfigService', 'UserButtonConfigService'];
    function UserTableConfigService(TableConfigService, UserButtonConfigService) {
        var service = {};
        service.makeCell = TableConfigService.makeCell;
        service.getColumns = getColumns;
        service.getTableOptions = getTableOptions;
        return service;

        function getTableOptions (){
            return TableConfigService.getOptions (service, UserButtonConfigService);
        }

        function getColumns (){
             return TableConfigService.geteColsDesc (["id", "name", "role"]);
        }//End getColumns
    }
})();
