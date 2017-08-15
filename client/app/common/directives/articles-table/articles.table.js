(function () {
    'use strict';

    //http://ng-table.com/#/editing/demo-inline
      angular
            .module('wikiApp')
            .directive('articlesTable', ['SiteConfigService', '$uibModal', '$state', 'toaster', 'NgTableParams', articlesTable]);

      function articlesTable (SiteConfigService, $uibModal, $state, toaster, NgTableParams){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {data : '=', options : '='};
            directive.templateUrl = '/app/common/directives/articles-table/articles.table.html';
            directive.replace = true;
            directive.controller = articlesTableController;  //Leval 1 function
            directive.compile = articlesTableCompile; //Leval 2 function
            directive.link = articlesTableLinking; //Leval 3 function
            return directive;


	      function articlesTableController($scope){
	      }

	      // function is executed once (1) for every instance of ui-jq in your original UNRENDERED template.
	      // Scope is UNAVAILABLE as the templates are only being cached. updatehour()
	      function articlesTableCompile (element, attributes){
	            return this.link;
	      }

	      // Function is executed once (1) for every RENDERED instance.
	      // Scope IS available because controller logic has finished executing.
	      // All variables and expression values can finally be determined.
	      function articlesTableLinking(scope, element, attrs, ctrl){
	    	  active();

	    	  function active() {
	    		  	scope.config = SiteConfigService.getSiteConfig();
		          	setStyle();
	          		scope.$watch('data', createSmartTable);
	          		scope.$watch('options', createSmartTable);
	          }

	          function setStyle (){
		          	scope.tableHeaderStyle = {};
		          	scope.fieldStyle = {};
		          	scope.tableHeaderStyle["font-weight"] = "bold";

		          	if (scope.config.isRtl){
		          		scope.fieldStyle["text-align"] = "right";
		          		scope.tableHeaderStyle["text-align"] = "right";
		          	}else{
		          		scope.fieldStyle["text-align"] = "left";
		          		scope.tableHeaderStyle["text-align"] = "left";
		          	}
	          }

	          function createSmartTable(){
              if (!scope.data){
                return;
              }
	        	 initializeOptions();
        		 scope.tableParams = new NgTableParams(scope.options.initialSettings, { data: scope.data});
        		 scope.tableParams.data = scope.data;
	          }

	          function initializeOptions (){
		  	    	if (!scope.options){
		  	    		scope.options = {};
		  	    	}
		  	    	if (!scope.options.tableCols){
		  	    		scope.options.tableCols = getTableDefualtCols();
		  	    	}
		  	    	if (!scope.initialSettings){
		  	    		scope.options.initialSettings = {
		  	    				count: 10,
		  	    				sorting: { datetime: "desc" }
		  	    		};
		  	    	}
		  	    	if (!scope.options.getDisplayProperty ){
		  	    		scope.options.getDisplayProperty = getDisplayProperty;
		  	    	}
	  	      }

	  	      function getTableDefualtCols (){
  	        	 var lang = scope.config.mapLanguage;
  	        	 var tableCols =  [
	                        { field: "id", title: lang.id, show: true, sortable: "id" },
	                        { field: "name", title: lang.name, sortable: "name", filter: {name: "text" }, show: true},
	                        { field: "nameSpace", title: lang.nameSpace, sortable: "nameSpace", filter: {nameSpace: "text" }, show: true},
	                        { field: "versionTime", title: lang.datetime, show: true, sortable: "versionTime"},
	                        { field: "actions", title: lang.actions, show: true }
	                      ];
  	        	 return tableCols;
	  	       }

	  	       function getDisplayProperty (article, col){
		  	    	  if (col.property==true){
		  	    		  var mapPropertyToValue = article.mapPropertyToValue;
		  	    		  var peoperty = mapPropertyToValue[col.field];
		  	    		  var result = "";
		  	    		  if (peoperty){
		  	    			  result = peoperty.value;
		  	    		  }
		  	    		  return result;
		  	    	  }
		  	    	  return article[col.field];
		  	   }//End getDisplayProperty
	      }//End articlesTableLinking
      }//End articlesTable
})();
