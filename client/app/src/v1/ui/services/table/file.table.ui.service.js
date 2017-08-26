(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('FileTableUiService', FileTableUiService);

    FileTableUiService.$inject = ['TableUiService', 'FileButtonUiService'];
    function FileTableUiService(TableConfig, FileButton) {
        var service = {};
        service.makeCell = TableConfig.makeCell;
        service.getColumns = getColumns;
        service.getTableOptions = getTableOptions;
        return service;

        function getTableOptions (){
            return TableConfig.getOptions (service, FileButton);
        }

        function getColumns (){
             return TableConfig.geteColsDesc (["id", "name", "type", "extension"]);
        }//End getColumns
    }
})();
