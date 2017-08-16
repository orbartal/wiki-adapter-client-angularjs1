(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('UserTableConfigService', UserTableConfigService);

    UserTableConfigService.$inject = ['SiteConfigService', 'TableConfigService', 'UserButtonConfigService'];
    function UserTableConfigService(SiteConfigService, TableConfigService, UserButtonConfigService) {
        var service = {};
        service.getColumns = getColumns;
        service.getTableOptions = getTableOptions;
        return service;

        function getTableOptions (){
          return TableConfigService.get(service, UserButtonConfigService);
        }

        function getColumns (){
          var config = SiteConfigService.getSiteConfig();
          var lang = config.mapLanguage;
          var tableCols =  [
             { field: "id", title: lang.id, sortable: "id", filter: {name: "text" }, show: true},
             { field: "name", title: lang.name, sortable: "name", filter: {name: "text" }, show: true},
             { field: "role", title: lang.role, sortable: "role", filter: {name: "text" }, show: true},
             { field: "actions", title: "actions", show: true}
          ];
          return tableCols;
    	  }//End getColumns
    }
})();
