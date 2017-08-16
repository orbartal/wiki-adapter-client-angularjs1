(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('ArticlesCtrl', ArticlesCtrl);

    ArticlesCtrl.$inject = ['ArticlesResourcesService', 'ButtonConfigService', 'toaster'];

    function ArticlesCtrl(ArticlesResourcesService, ButtonConfigService, toaster) {
        var vm = this;
        vm.allArticles = [];
        vm.optionsTable = {};
        vm.btnConfig = ButtonConfigService.getCreateArticle();
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
