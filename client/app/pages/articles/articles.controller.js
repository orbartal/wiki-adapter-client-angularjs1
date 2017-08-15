(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('ArticlesCtrl', ArticlesCtrl);

    ArticlesCtrl.$inject = ['ArticlesResourcesService', 'toaster'];

    function ArticlesCtrl(ArticlesResourcesService, toaster) {
        var vm = this;
        vm.allArticles = [];
        vm.options = {};
        active();

        function active() {
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
