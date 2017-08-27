(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('TableUiService', TableUiService);

    TableUiService.$inject = ['DefaultTableUiService'];
    function TableUiService(DefaultTableUiService) {
        var service = {};
        service.setConfig = setConfig;
        service.getOptions = getOptions;
        service.getData = getData;
        return service;

        function setConfig (owner, source, config){
            owner.optionsTable = service.getOptions(config);
            owner.dataTable = service.getData(source);
        }//End set

        function getOptions (config){
            return getOptions2 (config, config.getButtonsService());
        }

        function getOptions2 (columnsService, buttonsService){
            var optionsTable = {};
            optionsTable.topButtons = buttonsService.getTop();
            optionsTable.rowButtons = buttonsService.getRow();
            optionsTable.makeCell =  columnsService.makeCell;
            if (!optionsTable.makeCell){
                optionsTable.makeCell = DefaultTableUiService.makeCell;
            }
            if (columnsService.getColumns){
                optionsTable.tableCols = columnsService.getColumns();
            }else if (columnsService.getColumnsNames){
                var names = columnsService.getColumnsNames();
                optionsTable.tableCols = DefaultTableUiService.geteColsDesc(names);
            }
            //TODO: some defult
            return optionsTable
        }

        function getData (source){
            return getDataFromService;

            function getDataFromService ($defer, params) {
                  var params2 = $defer.prevParamsMemento.params;
                  var pageNumber = params2.page;
                  var pageSize = params2.count;
                  var page = {'page' : pageNumber, 'size' : pageSize};
                  var result = source.getAll(page).then(onSuccess, onFailure);
                  return result;

                  function onSuccess (responce){
                      var total = responce.totalElements;
                      var data1 = responce.content;
                      $defer.total(total);
                      return data1;
                  }

                   function onFailure (responce){
                       $defer.total(0);
                       return [];
                   }
            }//End getDataFromService
        }//End getData
    }//End
})();
