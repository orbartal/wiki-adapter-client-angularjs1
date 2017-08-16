(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('ArticlesCtrl', ArticlesCtrl);

    ArticlesCtrl.$inject = ['toaster', 'ArticlesResourcesService', 'ArticleTableConfigService'];

    function ArticlesCtrl(toaster, ArticlesResourcesService, ArticleTableConfigService) {
        var vm = this;
        vm.dataTable = [];
        vm.optionsTable = ArticleTableConfigService.getTableOptions();
        init();

        function init() {
            getAllArticles();
        }

        function getAllArticles() {
        	ArticlesResourcesService.getAll().then(onSuccess, onFailure);

        function onSuccess (articles) {
                vm.dataTable = articles;
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
