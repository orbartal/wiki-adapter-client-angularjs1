(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('ArticleHistoryCtrl', ArticleHistoryCtrl);

    ArticleHistoryCtrl.$inject = ['ArticlesVersionsResourcesService', 'ArticlesConfigService', '$scope', '$stateParams', '$uibModal', '$state', 'toaster', 'NgTableParams', 'SiteConfigService'];

    function ArticleHistoryCtrl(ArticlesVersionsResourcesService, ArticlesConfigService, $scope, $stateParams, $uibModal, $state, toaster, NgTableParams, SiteConfigService) {
        var vm = this;
        vm.article = null;
        vm.articleVersions = [];
		    vm.config = null;

        init();

        function init() {
        	var actions2 = {onView : true, onDelete: false, onEdit : true};
        	vm.options = {actions : actions2};
        	if (true){ //ArticlesService.areParamsValide($stateParams)
        		$scope.tabData   = ArticlesConfigService.getArticleTabsAndSetSiteConfig($scope, $stateParams);
        		getSiteConfigs();
        		getArticleHistory($stateParams.nameSpace, $stateParams.name);
        	}
        }

        function getSiteConfigs() {
        	vm.config = SiteConfigService.getSiteConfig();
        	vm.lId = vm.config.mapLanguage.id;
        	vm.lName = vm.config.mapLanguage.name;
        	vm.lDatetime = vm.config.mapLanguage.datetime;
        	vm.lActions = vm.config.mapLanguage.actions;
        }

        function getArticleHistory(nameSpace, name) {

        	ArticlesVersionsResourcesService.getArticleHistory(nameSpace, name).then(onSuccess, onFailure);

        	function onSuccess (data) {
                vm.articleVersions = data;
                getArticlesTime();
            }

        	function getArticlesTime() {
        		if (!vm.allArticles){
        			return;
        		}
     			for (var i = 0; i < vm.allArticles.length; i++) {
     				var date =moment(vm.allArticles[i].versionTime);
     				vm.articleVersions[i].datetime =  date.format('L') + ' '+ date.format('HH:mm:ss');
     			}
     		}

        	function onFailure(error) {
                debugger;
            }
        }
    }
})();
