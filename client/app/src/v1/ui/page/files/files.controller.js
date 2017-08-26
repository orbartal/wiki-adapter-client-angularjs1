(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('FilesCtrl', FilesCtrl);

    FilesCtrl.$inject = ['TableUiService', 'FilesDataService', 'FileTableUiService'];
    function FilesCtrl(TableUiService, FilesDataService, FileTableUiService) {
        TableUiService.setConfig (this, FilesDataService, FileTableUiService);
    }//End FilesCtrl
})();
