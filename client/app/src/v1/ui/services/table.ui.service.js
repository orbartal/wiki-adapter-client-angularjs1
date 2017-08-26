(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('TableConfigService', TableConfigService);

    TableConfigService.$inject = ['LanguageConfigService'];
    function TableConfigService(language) {
        var service = {};
        service.getOptions = getOptions;
        service.geteColsDesc = geteColsDesc;
        service.makeCell = makeCell;
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
                 result =  //'<p>' + row ['id']+'</p>' +
                            //'<buttons-in-row data="data['+rowIndex+']" options="options.rowButtons">'
                            '<buttons-in-row data=\''+rowJson +'\' options="options.rowButtons">'
                            +'</buttons-in-row>';
            }else{
                result = '<p>' + row [col.field]+'</p>';
            }
            return result;
        }
    }//End
})();
