(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('FileTableUiService', FileTableUiService);

    FileTableUiService.$inject = ['FileButtonUiService'];
    function FileTableUiService (FileButton) {
        var service = {};
        service.getButtonsService = getButtonsService;
        service.getColumnsNames = getColumnsNames;
        return service;

        function getButtonsService (){
            return FileButton;
        }

        function getColumnsNames (){
             return ["id", "name", "type", "extension"];
        }//End getColumns
    }
})();
