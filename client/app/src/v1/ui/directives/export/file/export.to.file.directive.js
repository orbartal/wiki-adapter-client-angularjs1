(function () {
    'use strict';

      angular
            .module('wikiApp')
            .directive('exportToFile', [exportToFile]);

      function exportToFile (){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {data : '=', options : '='};
            directive.templateUrl = "app/src/v1/ui/directives/export/file/export.to.file.html"
            directive.replace = true;
            directive.link = exportLinking; //Leval 3 function
            return directive;

	      function exportLinking(scope, element, attrs, ctrl){
	          active();

	          function active() {
		        	if (!scope.data){
		        		scope.data = getDefaultData();
		        	}
	          }

	          function getDefaultData (){
	        	  var data = {};
	        	  data.language = "mediawiki";
	        	  data.filePath = "D:\\MyCode\\WikiContent\\wikiExport\\output.xml";
	        	  return data;
	          }
	      }//End importLinking
      }
})();
