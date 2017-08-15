//http://jsfiddle.net/NWZZE/6/
(function () {
    'use strict';

      angular
            .module('wikiApp')
            .directive('compile', ['$compile', compile]);

      function compile ($compile){
            var directive = {};
            directive.restrict = 'A';
            directive.scope =  {};
        //    directive.templateUrl = '/app/common/directives/div-image/div.image.view.html';
            directive.replace = true;
            directive.controller = compileController;  //Leval 1 function
            directive.compile = compileCompile; //Leval 2 function
            directive.link = compileLinking; //Leval 3 function
            return directive;


	      function compileController($scope){
	      }

	      // function is executed once (1) for every instance of ui-jq in your original UNRENDERED template.
	      // Scope is UNAVAILABLE as the templates are only being cached. updatehour()
	      function compileCompile (element, attributes){
	            return this.link;
	      }

	      // Function is executed once (1) for every RENDERED instance.
	      // Scope IS available because controller logic has finished executing.
	      // All variables and expression values can finally be determined.
	      function compileLinking(scope, element, attrs, ctrl){
	    	  var x = 0;
	    	  scope.$watch(watchFun,watchFun2);

    			// watch the 'compile' expression for changes
	      		function watchFun (scope) {
	      			return attrs.compile;
 	            }

	      		function watchFun2(value) {
	   	              // when the 'compile' expression changes assign it into the current DOM
	   	              element.html(value);

	   	              // compile the new DOM and link it to the current scope.
	   	              // NOTE: we only compile .childNodes so that
	   	              // 	   we don't get into infinite loop compiling ourselves
	   	              var contents = element.contents();
	   	              $compile(contents)(scope);
   	           }
	      }
      }
})();
