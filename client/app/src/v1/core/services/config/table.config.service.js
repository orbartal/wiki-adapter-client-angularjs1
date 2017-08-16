(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('TableConfigService', TableConfigService);

    ArticleButtonConfigService.$inject = [];
    function TableConfigService() {
        var service = {};
        service.get= getBy;
        return service;

        function get (columnsService, topButtonsService, rowButtonsService){
          vm.optionsTable.topButtons = [topButtonsService.getCreate()];
    	  }//End getCreateButton


    }
})();
