(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('ArticleTableConfigService', ArticleTableConfigService);

    ArticleTableConfigService.$inject = ['TableConfigService', 'ArticleButtonConfigService'];
    function ArticleTableConfigService(TableConfigService, ArticleButtonConfigService) {
        var service = {};
        service.makeCell = TableConfigService.makeCell;
        service.getColumns = getColumns;
        service.getTableOptions = getTableOptions;
        return service;

        function getTableOptions (){
            return TableConfigService.getOptions (service, ArticleButtonConfigService);
        }

        function getColumns (){
             return TableConfigService.geteColsDesc (["id", "name", "nameSpace"]);
        }//End getColumns
    }
})();
