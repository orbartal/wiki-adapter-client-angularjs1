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
            directive.templateUrl = '/app/common/directives/div-image/div.image.view.html';
            directive.replace = true;
            directive.controller = divImageController;  //Leval 1 function
            directive.compile = divImageCompile; //Leval 2 function
            directive.link = divImageLinking; //Leval 3 function
            return directive;


	      function divImageController($scope){
	      }

	      // function is executed once (1) for every instance of ui-jq in your original UNRENDERED template.
	      // Scope is UNAVAILABLE as the templates are only being cached. updatehour()
	      function divImageCompile (element, attributes){
	            return this.link;
	      }

	      // Function is executed once (1) for every RENDERED instance.
	      // Scope IS available because controller logic has finished executing.
	      // All variables and expression values can finally be determined.
	      function divImageLinking(scope, element, attrs, ctrl){
	    	  scope.onImageClick =  onImageClick;
	    	  init();

	    	  function init(){
	    		  setStyle();
	    		  if (!scope.location){
	    			  return;
	    		  }
	    		  var imageE = element[0].firstElementChild;
	    		  /*
	    		  imageE.addEventListener('load', function() {
	    			  var width = imageE.clientWidth;
				      var height = imageE.clientHeight;
				      scope.$apply (function () {
				    //	 centerImage(width, height);
				      });
	    		  });
	    		  */
	    	  }

	    	  function centerImage (width, height){
	    		  scope.divStyle["position"] = "absolute";
		    	  scope.divStyle["left"] = "50%";
		    	  var halth = -(width /2);
		    	  scope.divStyle["margin-left"] = halth+"px";
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
	    			 // $state.go(scope.internalLink);
	    			  $state.go('site.file-view', scope.internalLinkArgs);
	    		  }
	    	  }

	      }
      }
})();
