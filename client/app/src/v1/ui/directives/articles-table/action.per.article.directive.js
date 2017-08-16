(function () {
    'use strict';

      angular
            .module('wikiApp')
            .directive('actionsOnArticle', ['$state', 'WikiDialog', 'SiteConfigService',  actionsOnArticle]); //, '$state' $state

      function actionsOnArticle ($state, WikiDialog, SiteConfigService){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {article : '=', options : '='};
            directive.templateUrl = '/app/src/v1/ui/directives/articles-table/action.per.article.directive.html';
            directive.replace = true;
            directive.link = actionsLinking; //Leval 3 function
            return directive;

	      function actionsLinking (scope, element, attrs, ctrl){
	    	  init();

	    	  function init() {
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

	        function onDeleteArticle (sArticle) {
              var objResolver =  {article :  sArticle};
              var strTemplateUrl = "app/src/v1/ui/modal/article/delete/article.delete.modal.html";
              var strController = "ModalDeleteArticleCtrl as vm";
              var objSuccess = {title: "Delete article successfully", body:"article"+sArticle.id};
              WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
	        }

          function onEditArticle (sArticle) {
              var objResolver =  {article :  sArticle};
              var strTemplateUrl = "app/src/v1/ui/modal/article/update/article.update.modal.html";
              var strController = "ModalEditArticleCtrl as vm";
              var objSuccess = {title: "Update article successfully", body:"article"+sArticle.id};
              WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
	        }
      }
  }
})();
