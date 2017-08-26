(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('RenameArticleCtrl', RenameArticleCtrl);

    RenameArticleCtrl.$inject = ['$scope', '$stateParams', '$state', 'ArticlesDataService', 'ArticlesTabsUiService',, 'toaster'];

    function RenameArticleCtrl($scope, $stateParams, $state, ArticlesDataService, ArticlesTabsUiService, toaster) {
        var vm = this;
        vm.tempArticle = null;
        vm.save = save;
        vm.reset=reset;

        initController();

        function initController() {
        	if (true){ //ArticlesService.areParamsValide($stateParams)
        		$scope.tabData   = ArticlesTabsUiService.getArticleTabsAndSetSiteConfig($scope, $stateParams);
        		getArticleFromServer ();
        	}
        }

        function getArticleFromServer() {
        	ArticlesDataService.getById($stateParams.id).then (onSuccess);


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
        	ArticlesDataService.update(vm.tempArticle).then(onSuccess, onFailure);

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
