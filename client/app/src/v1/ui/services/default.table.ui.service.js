(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('DefaultTableUiService', DefaultTableUiService);

    DefaultTableUiService.$inject = ['LanguageConfigService'];
    function DefaultTableUiService(language) {
        var service = {};
        service.getDataFunc = getDataFunc;
        service.geteColsDesc = geteColsDesc;
        service.getOneColDesc = getOneColDesc;
        service.makeCell = makeCell;
        return service;

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

        function getDataFunc (source){
            if (isFunction(source)){
                return source;
            }
            return getData;

            function getData ($defer, params) {
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
             }//End getData1

              function isFunction(obj) {
                  var getType = {};
                  return obj && getType.toString.call(obj) === '[object Function]';
              }
        }
    }//End
})();
