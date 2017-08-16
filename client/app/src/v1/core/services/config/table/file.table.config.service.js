(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('FileTableConfigService', FileTableConfigService);

    FileTableConfigService.$inject = ['SiteConfigService', 'TableConfigService', 'FileButtonConfigService'];
    function FileTableConfigService(SiteConfigService, TableConfigService, FileButtonConfigService) {
        var service = {};
        service.getColumns = getColumns;
        service.getTableOptions = getTableOptions;
        return service;

        function getTableOptions (){
          return TableConfigService.get(service, FileButtonConfigService);
        }

        function getColumns (){
          var config = SiteConfigService.getSiteConfig();
          var lang = config.mapLanguage;
          var tableCols =  [
             { field: "name", title: lang.name, sortable: "name", filter: {name: "text" }, show: true},
             { field: "type", title: "type", sortable: "type", filter: {type: "text" }, show: true},
             { field: "extension", title: "extension", sortable: "extension", filter: {extension: "text" }, show: true},
             { field: "versionTime", title: lang.datetime, show: true, sortable: "versionTime"},
             { field: "actions", title: "actions", show: true}
          ];
          return tableCols;
    	  }//End getColumns
    }
})();
