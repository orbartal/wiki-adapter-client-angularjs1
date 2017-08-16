(function () {
    'use strict';

    //http://ng-table.com/#/editing/demo-inline
      angular
            .module('wikiApp')
            .directive('tableWiki', ['SiteConfigService', 'NgTableParams', tableWiki]);

      function tableWiki (SiteConfigService, NgTableParams){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {data : '=', options : '='};
            directive.templateUrl = '/app/src/v1/ui/directives/table-wiki/table.wiki.directive.html';
            directive.replace = true;
            directive.link = articlesTableLinking; //Leval 3 function
            return directive;

	      function articlesTableLinking(scope, element, attrs, ctrl){
	    	  init();

	    	  function init() {
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
	                        { field: "actions", title: lang.actions, show: true }
	                      ];
  	        	 return tableCols;
	  	       }

	  	       function getDisplayProperty (row, col){
		  	    	  return row[col.field];
		  	   }//End getDisplayProperty

	      }//End articlesTableLinking
      }//End articlesTable
})();
