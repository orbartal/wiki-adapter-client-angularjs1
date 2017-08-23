(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('FileTableConfigService', FileTableConfigService);

    FileTableConfigService.$inject = ['TableConfigService', 'FileButtonConfigService'];
    function FileTableConfigService(TableConfigService, FileButtonConfigService) {
        var service = {};
        service.makeCell = TableConfigService.makeCell;
        service.getColumns = getColumns;
        service.getTableOptions = getTableOptions;
        return service;

        function getTableOptions (){
            return TableConfigService.getOptions (service, FileButtonConfigService);
        }

        function getColumns (){
             return TableConfigService.geteColsDesc (["id", "name", "type", "extension"]);
        }//End getColumns
    }
})();
