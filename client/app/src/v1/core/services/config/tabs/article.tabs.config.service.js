(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('ArticlesConfigService', ArticlesConfigService);

    ArticlesConfigService.$inject = ['SiteConfigService', 'toaster'];
    function ArticlesConfigService(SiteConfigService, toaster) {
        var service = {};
        //Config
        service.getArticleTabsAndSetSiteConfig = getArticleTabsAndSetSiteConfig;
        service.areParamsValide = areParamsValide;
        return service;

        ///////////////////////////

        //Config methods
        function getArticleTabsAndSetSiteConfig ($scope, $stateParams){
          	$scope.isCurrentVersion = $stateParams.isCurrentVersion;
          	setSiteConfig($scope);
          	var tabData   = getArticleTabs($stateParams, $scope.config);
          	if ($scope.config.languageDirection==="rtl"){
          		tabData.reverse();
          	}
          	return tabData;
    	  }

        function setSiteConfig($scope) {
        	$scope.config = SiteConfigService.getSiteConfig();
        	$scope.classTabs="class-right";
        	$scope.classArticleContent="class-right";
        	$scope.classArticleHeader="class-article-header class-right";
        	if ($scope.config.languageDirection==="rtl"){
        		$scope.classArticleHeader = "class-article-header class-right";
        		$scope.classBtnSave = "btn btn-primary class-right class-button-margin";
        		$scope.classBtnReset = "btn btn-white class-right class-button-margin";
        	}else{
        		$scope.classArticleHeader = "class-article-header class-left";
        		$scope.classBtnSave = "btn btn-primary class-left class-button-margin";
        		$scope.classBtnReset = "btn btn-white class-left class-button-margin";
        	}
        	$scope.textBtnSave = $scope.config.mapLanguage.btnSave;
        	$scope.textBtnReset = $scope.config.mapLanguage.btnReset;
        }


        function getArticleTabs($stateParams, config) {
        	//Get tabs args
        	var args = processStateParams ();
        	var lang = config.mapLanguage;

        	//Creates tabs
        	var readTab = getTab(lang.articleTabRead, 'site.article-read', args);
        	var viewSourceTab = getTab(lang.articleTabViewSource, 'site.article-view-source', args);
        	var editSourceTab = getTab(lang.articleTabEditSource, 'site.article-edit-source', args);
        	var editWysiwygTab = getTab(lang.articleTabEditWysiwyg, 'site.article-edit-wysiwyg', args);
        	var renameTab = getTab(lang.articleTabRename, 'site.article-rename', args);
        	var historyTab = getTab(lang.articleTabHistory, 'site.article-history', args);

        	//Create tabs array
        	var tabData   = [];
        	tabData.push(readTab);
        	if (args.nameSpace=="file"){

        	}else if (args.isActive==true){
            	tabData.push(editSourceTab);
            //	tabData.push(editWysiwygTab);
            	tabData.push(renameTab);
        	}else{
        		tabData.push(viewSourceTab);
        	}
        	tabData.push(historyTab);
        	return tabData;

        	function getTab (tabName, tabState, args){
        		var tab = {};
        		tab.heading = tabName;
        		tab.route = tabState;
        		tab.params = args;
        		return tab;
        	}

            function processStateParams (){
            	var args = {};
            	args.nameSpace = $stateParams.nameSpace;
            	args.name = $stateParams.name;
            	args.versionTime = $stateParams.versionTime;
            	args.isActive = ($stateParams.versionTime==undefined);
            	return args;
            }
        }

        function areParamsValide($stateParams) {
        	var errorMessage = null;
        	if (Utils.isEmptyObject($stateParams)){
        		errorMessage = "Invalid empty $stateParams";
        	}else if ((Utils.isEmptyObject($stateParams.name))){
        //			  (Utils.isEmptyObject($stateParams.nameSpace)) ||
        //			  (Utils.isEmptyObject($stateParams.isActive))){
        				errorMessage = "Invalid minising parameters in $stateParams=" + $stateParams;
        	}else if (($stateParams.isActive==false) &&
      			  (Utils.isEmptyObject($stateParams.versionTime))){
        		errorMessage = "Invalid minising parameter versionTime.";
        	}else if ((!$stateParams.isCurrentVersion) && ($stateParams.time<1)) {
        		errorMessage = "Invalid $stateParams.time=" + $stateParams.time;
        	}
        	if (errorMessage==null){
        		return true;
        	}
        	toaster.error({
                title: 'Error',
                body: 'Failed to get article due to error: ' + errorMessage,
            });
        	return false;
        }

     // private functions
        function onSuccess(result) {
        	return result.data;
        }

        function onFailure(error) {
            throw error.data;
        }
    }

})();
