(function () {
    'use strict';

    //http://ng-table.com/#/editing/demo-inline
      angular
            .module('wikiApp')
            .directive('tableWiki', ['LanguageConfigService', 'NgTableParams', '$interpolate', '$sce', tableWiki]);

      function tableWiki (language, NgTableParams, $interpolate, $sce){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {data : '=', options : '='};
            directive.templateUrl = '/app/src/v1/ui/directives/table-wiki/table.wiki.directive.html';
            directive.replace = true;
            directive.link = articlesTableLinking; //Leval 3 function
            return directive;

	      function articlesTableLinking(scope, element, attrs, ctrl){
	    	  init();
              scope.toHtml = toHtml;

              function getDisplayProperty (row, col){
                     return row[col.field];
              }//End getDisplayProperty


              function toHtml (colIndex, rowIndex, $data) {
                   //var col = scope.options.tableCols[colIndex];
                   var html = scope.options.makeCell
                            (colIndex, rowIndex, $data, scope.options);
                   var result = processHtml (html);
                   return result;
              }
              function processHtml (html) {
                  var html2 = html.replace(/&quot;/g, "'");
                  var html3 = $interpolate(html2)(scope);
                  var html4 = $sce.trustAsHtml(html3);
                   return html4;
               }

	    	  function init() {
		          	setStyle();
	          		scope.$watch('data', createSmartTable);
	          		scope.$watch('options', createSmartTable);
	          }

	          function setStyle (){
		          	scope.tableHeaderStyle = {};
		          	scope.fieldStyle = {};
		          	scope.tableHeaderStyle["font-weight"] = "bold";

		          	if (language.isRtl()){
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
                 var options1 = { sorting: { id: "desc" }};
                 var data1 = { dataset: scope.data};
        		 scope.tableParams = new NgTableParams(options1, data1);

                 //new NgTableParams(scope.options.initialSettings, { data: scope.data});
        		// scope.tableParams.data = scope.data;
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
  	        	 var tableCols =  [
	                        { field: "id", title: language.get('id'), show: true, sortable: "id" },
	                        { field: "actions", title: language.get('actions'), show: true }
	                      ];
  	        	 return tableCols;
	  	       }
	      }//End articlesTableLinking
      }//End articlesTable
})();
