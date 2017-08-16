(function () {
    'use strict';

    //http://ng-table.com/#/editing/demo-inline
      angular
            .module('wikiApp')
            .directive('articlesTable', ['SiteConfigService', 'NgTableParams', articlesTable]);

      function articlesTable (SiteConfigService, NgTableParams){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {data : '=', options : '='};
            directive.templateUrl = '/app/src/v1/ui/directives/articles-table/articles.table.directive.html';
            directive.replace = true;
            directive.link = articlesTableLinking; //Leval 3 function
            return directive;

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
