(function () {
    'use strict';

      angular
            .module('wikiApp')
            .directive('importFromFolder', [importFromFolder]);

      function importFromFolder (){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {data : '=', options : '='};
            directive.templateUrl = "app/src/v1/ui/directives/import/folder/import.from.folder.html"
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
	        	  data.folderPath = "D:\\MyCode\\WikiContent\\wikiImports\\images\\wiki_icon";
	        	  data.extensions = "jpg";
	        	  return data;
	          }


	      }//End importLinking
      }
})();
