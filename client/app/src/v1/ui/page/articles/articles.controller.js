(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('ArticlesCtrl', ArticlesCtrl);

    ArticlesCtrl.$inject = ['toaster', 'ArticlesDataService', 'ArticleTableConfigService'];
    function ArticlesCtrl(toaster, ArticlesDataService, ArticleTableConfigService) {
        var vm = this;
        vm.dataTable = [];
        vm.optionsTable = null;
        init();

        function init() {
            vm.optionsTable = ArticleTableConfigService.getTableOptions();
            getAllArticles();
        }

        function getAllArticles() {
            ArticlesDataService.getAll().then(onSuccess, onFailure);

            function onSuccess (articles) {
                    vm.dataTable = articles;
            }

            function onFailure (error) {
                    toaster.error({
                        title: 'Error',
                        body: 'Failed to get articles due to error: ' + error.message,
                    });
            }
        }//End getAllArticles
    }//End ArticlesCtrl
})();
