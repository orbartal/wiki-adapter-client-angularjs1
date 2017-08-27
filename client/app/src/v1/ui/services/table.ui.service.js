(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('TableUiService', TableUiService);

    TableUiService.$inject = ['LanguageConfigService'];
    function TableUiService(language) {
        var service = {};
        service.getOptions = getOptions;
        service.geteColsDesc = geteColsDesc;
        service.makeCell = makeCell;
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

        function geteColsDesc (fieldsNames) {
            var results = [];
            for (var i = 0; i < fieldsNames.length; i++) {
                var col = getOneColDesc(fieldsNames[i]);
                results.push(col);
            }
            var actions = {field: "actions", title: "actions", show: true}
            results.push (actions);
            return results;
        }

        function getOneColDesc (fieldName) {
            var filterDef = {};
            filterDef[fieldName] = "text";
            var strTitle = language.get(fieldName);
            var result = {
                field: fieldName,
                title: strTitle,
                sortable: fieldName,
                filter: filterDef,
                show: true
            };
            return result;
        }

        function makeCell (colIndex, rowIndex, data, options) {
            var result = 'error';
            var col = options.tableCols[colIndex];
            var row = data[rowIndex];
            if ("actions"===col.field){
                 var rowJson = angular.toJson(row);
                 result =  '<buttons-in-row data=\''+rowJson +'\' options="options.rowButtons">'
                            +'</buttons-in-row>';
            }else{
                result = '<p>' + row [col.field]+'</p>';
            }
            return result;
        }

        function setConfig (scope2, source, config){
            scope2.optionsTable = config.getTableOptions();
            scope2.dataTable = getData1;

            function getData1 ($defer, params) {
                  var params2 = $defer.prevParamsMemento.params;
                  var pageNumber = params2.page;
                  var pageSize = params2.count;
                  var page = {'page' : pageNumber, 'size' : pageSize};
                  return source.getAll(page).then(onSuccess,onFailure);

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
             }//End getData1
        }//End set
    }//End
})();
