(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('RenameArticleCtrl', RenameArticleCtrl);

    RenameArticleCtrl.$inject = ['$scope', '$stateParams', '$state', 'ArticlesResourcesService', 'ArticlesConfigService', 'SiteConfigService', 'toaster'];

    function RenameArticleCtrl($scope, $stateParams, $state, ArticlesResourcesService, ArticlesConfigService, SiteConfigService, toaster) {
        var vm = this;
        vm.tempArticle = null;
        vm.save = save;
        vm.reset=reset;

        initController();

        function initController() {
        	vm.config = SiteConfigService.getSiteConfig();
        	if (true){ //ArticlesService.areParamsValide($stateParams)
        		$scope.tabData   = ArticlesConfigService.getArticleTabsAndSetSiteConfig($scope, $stateParams);
        		getArticleFromServer ();
        	}
        }

        function getArticleFromServer() {
        	ArticlesResourcesService.getById($stateParams.id).then (onSuccess);


        	function onSuccess (data) {
        		vm.article = data;
        		vm.tempArticle = {};
     			angular.copy(vm.article,vm.tempArticle);
            }

        	function onFailure (error) {
        		toaster.error({
        			title: 'Error',
	                body: 'Failed to save article due to error: ' + error.message,
	            });
            }
        }

        function reset() {
        	getArticleFromServer();
        }

        function save () {
        	delete vm.article.versionTime;
        	delete vm.tempArticle.mapPropertyToValue;
    		  delete vm.tempArticle.categories;
        	ArticlesResourcesService.update(vm.tempArticle).then(onSuccess, onFailure);

			function onSuccess(article){
				toaster.success({
        			title: 'Save changes in article ' +vm.tempArticle.name,
	                body: 'The new article text was save.',
	            });
	        	$state.go('site.article-read', article);
			}

			function onFailure(error){
				toaster.error({
	                type: 'Error',
	                body: 'Failed to chnage article name due to error: ' + error.message,
	            });
			}
		}
    }
})();
