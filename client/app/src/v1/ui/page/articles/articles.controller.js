(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('ArticlesCtrl', ArticlesCtrl);

    ArticlesCtrl.$inject = ['ArticlesResourcesService', 'ArticleButtonConfigService', 'toaster'];

    function ArticlesCtrl(ArticlesResourcesService, ArticleButtonConfigService, toaster) {
        var vm = this;
        vm.btnConfig = ArticleButtonConfigService.getCreate();
        var articleRowActions = ArticleButtonConfigService.getRow();
        vm.allArticles = [];
        vm.optionsTable = {"actions" : articleRowActions};
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
