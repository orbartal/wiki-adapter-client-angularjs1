(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('ArticlesCtrl', ArticlesCtrl);

    ArticlesCtrl.$inject = ['ArticlesResourcesService', 'ArticleTableConfigService', 'toaster'];

    function ArticlesCtrl(ArticlesResourcesService, ArticleTableConfigService, toaster) {
        var vm = this;
        vm.allArticles = [];
        vm.optionsTable = ArticleTableConfigService.getTableOptions();
        init();

        function init() {
            getAllArticles();
        }

        function getAllArticles() {
        	ArticlesResourcesService.getAll().then(onSuccess, onFailure);

        function onSuccess (articles) {
                vm.allArticles = articles;
        }

        function onFailure (error) {
        		toaster.error({
        			title: 'Error',
	                body: 'Failed to get articles due to error: ' + error.message,
	            });
            }
        }
    }
})();
