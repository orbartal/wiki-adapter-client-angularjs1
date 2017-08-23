(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('JobTableConfigService', JobTableConfigService);

    JobTableConfigService.$inject = ['TableConfigService', 'JobButtonConfigService'];
    function JobTableConfigService(TableConfigService, JobButtonConfigService) {
        var service = {};
        service.makeCell = makeCell;
        service.getColumns = getColumns;
        service.getTableOptions = getTableOptions;
        return service;

        function getTableOptions (){
            return TableConfigService.getOptions (service, JobButtonConfigService);
        }

        function getColumns (){
            return  TableConfigService.geteColsDesc
                (["id", "title", "start", "duration", "value", "progress"]);
        }//End getColumns

        function makeCell (colIndex, rowIndex, data, options){
            var col = options.tableCols[colIndex];
            var row = data[rowIndex];
            if ("progress"===col.field){
                return 	'<job-progress-bar ' +
                            'data = "{jobId:' + row.id + '}"  ' +
                            'options = "{hideText: true, title:' + row.title + '}">' +
    				    '</job-progress-bar>';
            }
            return TableConfigService.makeCell(colIndex, rowIndex, data, options);
        }
    }
})();
