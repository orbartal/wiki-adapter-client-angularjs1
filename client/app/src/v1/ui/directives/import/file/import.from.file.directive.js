(function () {
    'use strict';

      angular
            .module('wikiApp')
            .directive('importFromFile', [importFromFile]);

      function importFromFile (){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {data : '=', options : '='};
            directive.templateUrl = "/app/src/v1/ui/directives/import/file/import.from.file.directive.html"
            directive.replace = true;
            directive.link = importLinking; //Leval 3 function
            return directive;

	      function importLinking(scope, element, attrs, ctrl){
	          active();

	          function active() {
	        	if (!scope.data){
	        		scope.data = getDefaultData();
	        	}
	          }

	          function getDefaultData (){
	        	  var data = {};
	        	  data.language = "mediawiki";
	        	  data.filePath = "D:\\MyCode\\\WikiContent\\wikiImports\\xml\\Wikipedia-Category-Chinese-poems-history.xml";
	        	  return data;
	          }
	      }//End importLinking
      }
})();
