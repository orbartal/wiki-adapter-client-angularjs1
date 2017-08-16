(function () {
    'use strict';

    angular
    .module('wikiApp')
    .directive('wikiMainSideMenu', [wikiMainSideMenu]);

      function wikiMainSideMenu(){

            //Directive variables
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {isRtl : '=',};
            directive.templateUrl = '/app/src/v1/ui/directives/wiki-main-side-menu/wiki.main.side.menu.directive.html';
            directive.replace = true;

            //Directive methods
            directive.controller = wikiMainSideMenuController;  //Leval 1 function
            directive.compile = wikiMainSideMenuCompile; //Leval 2 function
            directive.link = wikiMainSideMenuLinking; //Leval 3 function

            return directive;
      }

      function wikiMainSideMenuController($scope){

          $(function () {
            $('#wikiSideMenu').metisMenu(
          		{ toggle: false}
          	);
          });

      	  $scope.$on('$stateChangeStart', onStateChange);
      }

      function onStateChange (event, toState, toParams, fromState, fromParams){
		        var stateUrl = toState.url;
		        $(findSelectedState);

		  function findSelectedState(){
			    // this will get the full URL at the address bar
			    var url = window.location.href;

			    // passes on every "a" tag
			    $("#wikiSideMenu a").each(isSelectedState);

			    function isSelectedState () {
		            // checks if its the same on the address bar
			    	var linkUrl =  this.href.split('#')[1];
			        if(stateUrl == (linkUrl)) {
			            $(this).addClass("sidebar-nav-selected");
			            //.closest("li")
			        }else{
			        	 $(this).removeClass("sidebar-nav-selected");
			        }
			    }//isSelectedState
		  	}//findSelectedState
	   }//onStateChange

      // function is executed once (1) for every instance of ui-jq in your original UNRENDERED template.
      // Scope is UNAVAILABLE as the templates are only being cached. updatehour()
      function wikiMainSideMenuCompile (element, attributes){
            return this.link;
      }

      // Function is executed once (1) for every RENDERED instance.
      // Scope IS available because controller logic has finished executing.
      // All variables and expression values can finally be determined.
      function wikiMainSideMenuLinking(scope, element, attrs, ctrl){
      }
})();
