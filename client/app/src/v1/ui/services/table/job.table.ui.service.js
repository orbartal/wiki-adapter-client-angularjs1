(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('JobTableUiService', JobTableUiService);

    JobTableUiService.$inject = ['JobButtonUiService', 'DefaultTableUiService'];
    function JobTableUiService (JobButton, DefaultTableUiService) {
        var service = {};
        service.getButtonsService = getButtonsService;
        service.getColumnsNames = getColumnsNames;
        service.makeCell = makeCell;
        return service;

        function getButtonsService (){
            return JobButton;
        }

        function getColumnsNames (){
             return ["id", "title", "start", "duration", "value", "progress"];
        }

        function makeCell (colIndex, rowIndex, data, options){
            var col = options.tableCols[colIndex];
            var row = data[rowIndex];
            if ("progress"===col.field){
                return 	'<job-progress-bar ' +
                            'data = "{jobId:' + row.id + '}"  ' +
                            'options = "{hideText: true, title:' + row.title + '}">' +
    				    '</job-progress-bar>';
            }
            return DefaultTableUiService.makeCell(colIndex, rowIndex, data, options);
        }
    }
})();
