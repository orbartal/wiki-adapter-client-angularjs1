(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('ReadArticleCtrl', ReadArticleCtrl);

    ReadArticleCtrl.$inject = ['$scope', '$sce', '$interpolate', '$compile' , '$state' , '$stateParams', 'ArticlesDataService', 'SiteConfigService' , 'toaster', '$uibModal', 'ArticlesConfigService', 'WikiUtils'];

    function ReadArticleCtrl($scope, $sce, $interpolate, $compile, $state, $stateParams,
                            ArticlesDataService, SiteConfigService, toaster, $uibModal,
                            ArticlesConfigService, WikiUtils){
        var vm = this;
        vm.article = null;
        vm.openCreateArticleDialog=openCreateArticleDialog;
        active();

        function active() {
        	vm.stateParams = $stateParams;
        	setSettings ();
        	if (true){ //ArticlesConfigService.areParamsValide($stateParams)
        		  $scope.tabData   = ArticlesConfigService.getArticleTabsAndSetSiteConfig($scope, $stateParams);
            	$scope.classArticleContent="class-right class-html-view row";
            	ArticlesDataService.getById($stateParams.name).then (onSuccess, onFailure);
        	}

        	function onSuccess (data){
        		vm.article = data;
        		vm.article.isCategory  = WikiUtils.isEqualsText(vm.article.nameSpace, 'category');
        		vm.article.isProperty  = WikiUtils.isEqualsText(vm.article.nameSpace, 'property');
        		vm.article.isFile  = WikiUtils.isEqualsText(vm.article.nameSpace, 'file');

        		if (vm.article.isCategory){
        			getArticlesByCategory();
        		}
        		if (vm.article.isFile){
        			vm.image = {};
              		vm.image.width = 250;
              		vm.image.height = 250;
              		vm.image.url = "/files/file/view/"+vm.article.name+"/" +
              						vm.image.width + "/" + vm.image.height;
              		if (vm.article.isActive==false){
              			vm.image.url = "/files/file/view/"+vm.article.name+"/" +
              				vm.article.versionTime + "/"+
              				vm.image.width + "/" + vm.image.height;
              		}
        		}
        	}

        	function onFailure (error){
        		debugger;
        	}

        	 function setSettings (){
             	vm.config = SiteConfigService.getSiteConfig();
     	       	if (!vm.config){
     	       		var mapLanguage1 = {addArticle : 'add article'};
     	       		vm.config = {mapLanguage : mapLanguage1};
     	       	}
     	       	if (vm.config.languageDirection=="rtl"){
     	       		vm.config.isRTL = true;
     	       	}else{
     	       		vm.config.isRTL = false;
     	       	}
             }
        }

        function getArticlesByCategory() {
        	ArticlesDataService.getByCategory(vm.article.name).then(onSuccess, onFailure);

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

        $scope.getArticleHtml = function() {
        	return processHtml (vm.article.html);
        }

        $scope.getMissingArticleWarning = function() {
        	return processHtml (vm.config.mapLanguage.articleRead.ArticleDoesntExist);
        }

       function processHtml (html) {
        	var html2 = html.replace(/&quot;/g, "'");
        	var html3 = $interpolate(html2)($scope);
        	var html4 = $sce.trustAsHtml(html3);
            return html4;
        }

        function openCreateArticleDialog () {
        	var modalInstance = getCreateArticleModal();
        	modalInstance.result.then(onConfirm, onCancel);

			function onConfirm(data){
				modalInstance.close();
				toaster.success({
					title: "create new article successfully",
					body:"article="+data.name
				});
				data.isActive=true;
				setTimeout(function () {
					$state.go('site.article-read', data);
			    }, 1000);

			}

			function onCancel (data){
			}

			function getCreateArticleModal (){
				var newArticle = {};
	        	newArticle.name=$stateParams.name;
	        	newArticle.nameSpace=$stateParams.nameSpace;
	        	if (newArticle.nameSpace=="file"){
	        		var res = $uibModal.open({
	        			backdrop : 'static',
		  				size: "lg",
		  				templateUrl: '/app/pages/files/modal/create/modal.add.new.file.html',
		  				controller: "AddNewFileCtrl as vm",
					});
	        	}else{
	        		var res = $uibModal.open({
		        		backdrop : 'static',
						size: "lg",
						templateUrl: '/app/pages/articles/modal/create/modal.create.article.view.html',
						controller: "ModalCreateArticleCtrl as vm",
						resolve: {
							article: function(){
								return newArticle;
							}
						}
					});
	        	}
				return res;
			}
        }
    }
})();
