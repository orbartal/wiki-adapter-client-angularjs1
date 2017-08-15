(function () {
    'use strict';

      angular
            .module('wikiApp')
            .directive('actionsOnArticlesTable', ['SiteConfigService', '$uibModal', '$state', 'toaster', actionsOnArticlesTable]); //, '$state' $state

      function actionsOnArticlesTable (SiteConfigService, $uibModal, $state, toaster){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {};
            directive.templateUrl = '/app/common/directives/articles-table/actions.on.articles.table.html';
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

	    	  scope.openCreateArticleDialog = openCreateArticleDialog;

	    	  active();

	    	  function active() {
	    		  	scope.config = SiteConfigService.getSiteConfig();
	    		  	setStyle ();
	    	  }

	    	  function setStyle (){
		          	scope.tableButtonClass = ["btn", "btn-primary", "btn-xs", "class-round-button"];
		          	if (scope.config.isRtl){
		          		scope.tableButtonClass.push("pull-right");
		          	}else{
		          		scope.tableButtonClass.push("pull-left");
		          	}
	          }

	    	  function openCreateArticleDialog () {
		          	var newArticle = {};
		          	var modalInstance = $uibModal.open({
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

		          	modalInstance.result.then(onConfirm, onCancel);

		  			function onConfirm(data){
		  				modalInstance.close();
		  				toaster.success({
		  					title: "create new article successfully",
		  					body:"article="+data.name
		  				});
		  			}

		  			function onCancel (data){}
	    	  }
	      }
      }
})();
