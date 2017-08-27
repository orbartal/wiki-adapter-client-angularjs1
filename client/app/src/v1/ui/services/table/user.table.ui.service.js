(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('UserTableUiService', UserTableUiService);

    UserTableUiService.$inject = ['UserButtonUiService'];
    function UserTableUiService(UserButton) {
        var service = {};
        service.getButtonsService = getButtonsService;
        service.getColumnsNames = getColumnsNames;
        return service;

        function getButtonsService (){
            return UserButton;
        }

        function getColumnsNames (){
             return ["id", "name", "role"];
        }
    }
})();
