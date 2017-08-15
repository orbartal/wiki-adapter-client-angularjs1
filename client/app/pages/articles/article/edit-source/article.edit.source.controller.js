(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('EditSourceArticleCtrl', EditSourceArticleCtrl);

    EditSourceArticleCtrl.$inject = ['$scope', '$stateParams', '$state', 'ArticlesResourcesService', 'ArticlesConfigService' , 'WikiUtils', 'toaster'];

    function EditSourceArticleCtrl($scope, $stateParams, $state, ArticlesResourcesService, ArticlesConfigService, WikiUtils, toaster) {
        var vm = this;
        vm.tempArticle = null;
        vm.save = save;
        vm.reset=reset;

        init ();

        function init () {
        	if (true){ //ArticlesService.areParamsValide($stateParams)
        		$scope.tabData   = ArticlesConfigService.getArticleTabsAndSetSiteConfig($scope, $stateParams);
        		$scope.classArticleContent="class-right form-control";
        		getArticleFromServer ();
        	}
        }

        function getArticleFromServer (){
        	ArticlesResourcesService.getById($stateParams.title).then (onSuccess);

        	function onSuccess (data) {
        		vm.article = data;
        		vm.tempArticle = {};
     			angular.copy(vm.article, vm.tempArticle);
     			vm.tempArticle.isProperty  = WikiUtils.isEqualsText(vm.tempArticle.nameSpace, 'property');
            }
        }

        function reset() {
        	getArticleFromServer ();
        }

        function save () {
        	if (vm.tempArticle){
        		delete vm.tempArticle.versionTime;
        		delete vm.tempArticle.mapPropertyToValue;
        		delete vm.tempArticle.categories;
        	}
        	ArticlesService.updateArticle(vm.tempArticle).then(onSuccess, onFailure);

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
	                body: 'Failed to update article due to error: ' + error.message,
	            });
			}
		}
    }
})();
