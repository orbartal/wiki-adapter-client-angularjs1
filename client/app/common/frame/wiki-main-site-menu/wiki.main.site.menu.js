(function () {
    'use strict';

    angular
    .module('wikiApp')
    .directive('wikiMainSiteMenu', ['$state', wikiMainSiteMenu]);

      function wikiMainSiteMenu($state){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {isRtl : '=',};
            directive.templateUrl = '/app/common/frame/wiki-main-site-menu/wiki.main.site.menu.html';
            directive.replace = true;


            directive.controller = wikiMainSiteMenuController;  //Leval 1 function
            directive.compile = wikiMainSiteMenuCompile; //Leval 2 function
            directive.link = wikiMainSiteMenuLinking; //Leval 3 function

            return directive;


            function wikiMainSiteMenuController($scope){
            }

            function setDefaultSettings ($scope){
          	  $scope.logIn = "Login";
            	$scope.logOut = "Logout";
            }

            // function is executed once (1) for every instance of ui-jq in your original UNRENDERED template.
            // Scope is UNAVAILABLE as the templates are only being cached. updatehour()
            function wikiMainSiteMenuCompile (element, attributes){
                  return this.link;
            }

            // Function is executed once (1) for every RENDERED instance.
            // Scope IS available because controller logic has finished executing.
            // All variables and expression values can finally be determined.
            function wikiMainSiteMenuLinking(scope, element, attrs, ctrl){
            }
      }


})();
