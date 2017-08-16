(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('TableConfigService', TableConfigService);

    TableConfigService.$inject = [];
    function TableConfigService() {
        var service = {};
        service.get= get;
        return service;

        function get (columnsService, buttonsService){
          var optionsTable = {};
          optionsTable.topButtons = [buttonsService.getCreate()];
          optionsTable.rowButtons = buttonsService.getRow();
          optionsTable.tableCols = columnsService.getColumns();
          return optionsTable
    	  }//End getCreateButton


    }
})();
