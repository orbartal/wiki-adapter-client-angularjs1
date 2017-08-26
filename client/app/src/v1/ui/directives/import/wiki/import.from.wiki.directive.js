(function () {
    'use strict';

      angular
            .module('wikiApp')
            .directive('importFromWiki', [importFromWiki]);

      function importFromWiki (){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {data : '=', options : '='};
            directive.templateUrl = "app/src/v1/ui/directives/import/wiki/import.from.wiki.html"
            directive.replace = true;
            directive.link = importLinking; //Leval 3 function
            return directive;

	      function importLinking(scope, element, attrs, ctrl){
	          active();

	          function active() {
	        	if (!scope.data){
	        		scope.data = getDefaultData();
	        	}
	        	setSettings ();
	          }

	          function getDefaultData (){
	        	  var data = {};
	        	  data.url = "https://en.wikipedia.org/w/";
	        	  data.language = "mediawiki";
	        	  data.nameSpace = "";
	        	  data.category = "Chinese poems";
	        	  data.article = "File:Henrik Stenson.JPG";
	        	  data.history = 'false';
	        	  data.filter = "category";
	        	  return data;
	          }

	          function setSettings (){
	          	setSettingsByConfig();
	  	       	$("table input").addClass("input-in-table");
	  	       	$("table select").addClass("input-in-table");
	          }

	          function setSettingsByConfig(){
	          	scope.tdLabelClass =[];
	          	if (scope.config.isRtl){
	          		scope.tdLabelClass.push("pull-right");
	          	}else{
	          		scope.config.languageDirection=="rlt";
	          		scope.tdLabelClass.push("pull-left");
	          	}
	          	scope.classBtnSave = "btn btn-primary class-right class-button-margin";
	      		scope.classBtnReset = "btn btn-white class-right class-button-margin";
	          }
	      }//End importLinking
      }
})();
