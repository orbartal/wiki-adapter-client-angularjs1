(function () {
    'use strict';

      angular
            .module('wikiApp')
            .directive('buttonsInRow', ['SiteConfigService', buttonsInRow]);

      function buttonsInRow (SiteConfigService){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {data : '=', options : '='};
            directive.templateUrl = '/app/src/v1/ui/directives/buttons-in-row/buttons.in.row.directive.html';
            directive.replace = true;
            directive.link = actionsLinking; //Leval 3 function
            return directive;

	   function actionsLinking (scope, element, attrs, ctrl){
          scope.applay = applay;
	    	  init();

          function applay (btn) {
            return btn.action(scope.data);
          }

  	    function init() {
  	    		  	scope.config = SiteConfigService.getSiteConfig();
  		          setStyle();
  	    }

  	   function setStyle (){
  		          	scope.rowButtonClass =["btn", "class-row-button"];
  		          	if (scope.config.isRtl){
  		          		scope.rowButtonClass.push("class-right");
  		          	}else{
  		          		scope.rowButtonClass.push("class-left");
  		          	}
  	          }
        }


  }
})();
