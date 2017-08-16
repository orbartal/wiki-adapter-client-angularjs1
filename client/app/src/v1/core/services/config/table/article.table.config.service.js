(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('ArticleTableConfigService', ArticleTableConfigService);

    ArticleTableConfigService.$inject = ['SiteConfigService', 'TableConfigService', 'ArticleButtonConfigService'];
    function ArticleTableConfigService(SiteConfigService, TableConfigService, ArticleButtonConfigService) {
        var service = {};
        service.getColumns = getColumns;
        service.getTableOptions = getTableOptions;
        return service;

        function getTableOptions (){
          return TableConfigService.get(service, ArticleButtonConfigService);
        }

        function getColumns (){
          var config = SiteConfigService.getSiteConfig();
          var lang = config.mapLanguage;
          var tableCols =  [
                     { field: "id", title: lang.id, show: true, sortable: "id" },
                     { field: "name", title: lang.name, sortable: "name", filter: {name: "text" }, show: true},
                     { field: "nameSpace", title: lang.nameSpace, sortable: "nameSpace", filter: {nameSpace: "text" }, show: true},
                     { field: "versionTime", title: lang.datetime, show: true, sortable: "versionTime"},
                     { field: "actions", title: lang.actions, show: true }
                   ];
          return tableCols;
    	  }//End getCols
    }
})();
