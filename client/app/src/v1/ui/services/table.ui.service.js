(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('TableUiService', TableUiService);

    TableUiService.$inject = ['LanguageConfigService', 'DefaultTableUiService'];
    function TableUiService(language, DefaultTableUiService) {
        var service = {};
        service.getOptions = getOptions;
        service.geteColsDesc = DefaultTableUiService.geteColsDesc;
        service.makeCell = DefaultTableUiService.makeCell;
        service.setConfig = setConfig;
        return service;

        function getOptions (columnsService, buttonsService){
          var optionsTable = {};
          optionsTable.topButtons = buttonsService.getTop();
          optionsTable.rowButtons = buttonsService.getRow();
          optionsTable.tableCols = columnsService.getColumns();
          optionsTable.makeCell =  columnsService.makeCell;
          return optionsTable
        }//End get

        function setConfig (scope2, source, config){
            scope2.optionsTable = config.getTableOptions();
            scope2.dataTable = DefaultTableUiService.getDataFunc(source);
        }//End set
    }//End
})();
