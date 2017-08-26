(function () {
    'use strict';

      angular
            .module('wikiApp')
            .directive('divImage', ['$state', divImage]);

      function divImage($state){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {urlSrc : '=', internalLink : '=', internalLinkArgs : '=',  externalLink : '=',
            					alt : '=', title : '=', width : '=', height : '=', location : '='};
            directive.templateUrl = '/app/src/v1/ui/directives/div-static-image/div.static.image.directive.html';
            directive.replace = true;
            directive.link = divImageLinking; //Leval 3 function
            return directive;

	      function divImageLinking(scope, element, attrs, ctrl){
	    	  scope.onImageClick =  onImageClick;
	    	  init();

	    	  function init(){
	    		  setStyle();
	    	  }

	    	  function setStyle(){
	    		  scope.divStyle = {};
	    		  if (scope.location){
	    			  scope.divStyle["display"]="block";
		    		  scope.divStyle["margin"]="auto";
	    		  }
	    		  if (scope.width){
	    			scope.divStyle["width"] = scope.width;
	    		  }
	    		  if (scope.height){
	    			  scope.divStyle["height"] = scope.height;
	    		  }
	    		  if (scope.internalLink || scope.externalLink){
	    			  scope.divStyle["cursor"] = "pointer";
	    		  }else{
	    			  scope.divStyle["cursor"] = "auto";
	    		  }
	    	  }


	    	  function onImageClick () {
	    		  if (!scope.internalLink && scope.externalLink){
	    			  window.location.href = scope.externalLink;
	    		  }else if (scope.internalLink && !scope.externalLink){
	    			  $state.go('site.file-view', scope.internalLinkArgs);
	    		  }
	    	  }

	      }
      }
})();
