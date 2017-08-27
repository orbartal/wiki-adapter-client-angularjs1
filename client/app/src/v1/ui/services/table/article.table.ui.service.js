(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('ArticleTableUiService', ArticleTableUiService);

    ArticleTableUiService.$inject = ['ArticleButtonUiService'];
    function ArticleTableUiService(ArticleButton) {
        var service = {};
        service.getButtonsService = getButtonsService;
        service.getColumnsNames = getColumnsNames;
        return service;

        function getButtonsService (){
            return ArticleButton;
        }

        function getColumnsNames (){
             return ["id", "name", "nameSpace"];
        }//End getColumns
    }
})();
