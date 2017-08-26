(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('ArticleTableConfigService', ArticleTableConfigService);

    ArticleTableConfigService.$inject = ['TableConfigService', 'ArticleButtonConfigService'];
    function ArticleTableConfigService(TableConfig, ArticleButton) {
        var service = {};
        service.makeCell = TableConfig.makeCell;
        service.getColumns = getColumns;
        service.getTableOptions = getTableOptions;
        return service;

        function getTableOptions (){
            return TableConfig.getOptions (service, ArticleButton);
        }

        function getColumns (){
             return TableConfig.geteColsDesc (["id", "name", "nameSpace"]);
        }//End getColumns
    }
})();
