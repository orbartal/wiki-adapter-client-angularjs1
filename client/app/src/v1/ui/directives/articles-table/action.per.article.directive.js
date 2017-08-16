(function () {
    'use strict';

      angular
            .module('wikiApp')
            .directive('actionsOnArticle', ['SiteConfigService', '$uibModal', '$state', 'toaster', actionsOnArticle]); //, '$state' $state

      function actionsOnArticle (SiteConfigService, $uibModal, $state, toaster){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {article : '=', options : '='};
            directive.templateUrl = '/app/src/v1/ui/directives/articles-table/action.per.article.directive.html';
            directive.replace = true;
            directive.controller = actionsController;  //Leval 1 function
            directive.compile = actionsCompile; //Leval 2 function
            directive.link = actionsLinking; //Leval 3 function
            return directive;


	      function actionsController($scope){
	      }

	      // function is executed once (1) for every instance of ui-jq in your original UNRENDERED template.
	      // Scope is UNAVAILABLE as the templates are only being cached. updatehour()
	      function actionsCompile (element, attributes){
	            return this.link;
	      }

	      // Function is executed once (1) for every RENDERED instance.
	      // Scope IS available because controller logic has finished executing.
	      // All variables and expression values can finally be determined.
	      function actionsLinking (scope, element, attrs, ctrl){
	    	  active();

	    	  function active() {
	    		  	scope.config = SiteConfigService.getSiteConfig();
		    		if (!scope.article) {
			    		  scope.article = {};
			    	}
		          	setStyle();
		          	setOptions();
	          }

	    	  function setOptions (){
	    		  if (!scope.options){
	    			  scope.options = {};
		    		  scope.options.onView = onViewArticle;
		    		  scope.options.onDelete = onDeleteArticle;
		    		  scope.options.onEdit = onEditArticle;
	    		  }
	    		  if (scope.options.onView === true){
	    			  scope.options.onView = onViewArticle;
	    		  }
	    		  if (scope.options.onDelete === true){
	    			  scope.options.onDelete = onDeleteArticle;
	    		  }
	    		  if (scope.options.onEdit === true){
	    			  scope.options.onEdit = onEditArticle;
	    		  }
	    	  }

	    	  function setStyle (){
		          	scope.rowButtonClass =["btn", "class-row-button"];
		          	if (scope.config.isRtl){
		          		scope.rowButtonClass.push("class-right");
		          	}else{
		          		scope.rowButtonClass.push("class-left");
		          	}
	          }

	          function onViewArticle (article) {
	          	var params = {nameSpace: article.nameSpace, name : article.name};
	          	if (article.isActive==false){
	          		params['isActive']=article.isActive;
	          		params['history']=article.isActive;
	          		params['versionTime']=article.versionTime;
	          	}
	          	$state.go('site.article-read', params);
	          }

	          function onDeleteArticle (selectedArticle) {
	        	//var selectedArticle = scope.article;
	          	var modalInstance = $uibModal.open({
	          		backdrop : 'static',
	  				size: "lg",
	  				templateUrl: "app/src/v1/ui/modal/article/delete/article.delete.modal.html",
	  				controller: "ModalDeleteArticleCtrl as vm",
	  				resolve: {
	  					article: function(){
	  						return selectedArticle;
	  					}
	  				}
	  			});

	          	modalInstance.result.then(onConfirm, onCancel);

	  			function onConfirm(data){
	  				modalInstance.close();
	  				toaster.success ({
	  					title: "Delete article successfully",
	  					body:"article="+data.name
	  				});
	  			}

	  			function onCancel (data){
	  			}
	          }

	          function onEditArticle (selectedArticle) {
	        //	var selectedArticle = scope.article;
	          	var modalInstance = $uibModal.open({
	          		backdrop : 'static',
	  				size: "lg",
	  				templateUrl: "app/src/v1/ui/modal/article/update/article.update.modal.html",
	  				controller: "ModalEditArticleCtrl as vm",
	  				resolve: {
	  					article: function(){
	  						return selectedArticle;
	  					}
	  				}
	  			});

	          	modalInstance.result.then(onConfirm, onCancel);

	  			function onConfirm(data){
	  				modalInstance.close();
	  				toaster.success({
	  						title: "Update article data successfully",
	  						body:"article="+data.name
	  				});
	  			}

	  			function onCancel (data){}
	          }
	      }
      }
})();
