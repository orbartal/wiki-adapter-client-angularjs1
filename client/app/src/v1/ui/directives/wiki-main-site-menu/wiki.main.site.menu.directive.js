(function () {
    'use strict';

    angular
        .module('wikiApp')
        .directive('wikiMainSiteMenu', ['$state', wikiMainSiteMenu]);

    function wikiMainSiteMenu($state){
        var directive = {};
        directive.restrict = 'E';
        directive.scope =  {isRtl : '=',};
        directive.templateUrl = '/app/src/v1/ui/directives/wiki-main-site-menu/wiki.main.site.menu.directive.html';
        directive.replace = true;
        directive.controller = wikiMainSiteMenuController;  //Leval 1 function
        return directive;

        function wikiMainSiteMenuController($scope){
            $scope.logIn = "Login";
            $scope.logOut = "Logout";
        } //End wikiMainSiteMenuController
    }//End wikiMainSiteMenu
})();
