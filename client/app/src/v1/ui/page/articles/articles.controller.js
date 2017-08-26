(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('ArticlesCtrl', ArticlesCtrl);

    ArticlesCtrl.$inject = ['TableUiService', 'ArticlesDataService', 'ArticleTableUiService'];
    function ArticlesCtrl(TableUiService, ArticlesDataService, ArticleTableUiService) {
        TableUiService.setConfig (this, ArticlesDataService, ArticleTableUiService);
    }//End ArticlesCtrl
})();
