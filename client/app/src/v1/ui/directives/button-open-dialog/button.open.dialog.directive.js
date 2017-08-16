(function () {
    'use strict';

      angular
            .module('wikiApp')
            .directive('buttonOpenDialog', ['SiteConfigService', 'WikiDialog', buttonOpenDialog]);

      function buttonOpenDialog (SiteConfigService, WikiDialog){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {data : '=', options : '='}
            directive.templateUrl = '/app/src/v1/ui/directives/button-open-dialog/button.open.dialog.directive.html';
            directive.replace = true;
            directive.link = actionsLinking; //Leval 3 function
            return directive;

	      function actionsLinking (scope, element, attrs, ctrl){
	    	  scope.openDialog = openDialog;

	    	  function openDialog () {
            //TODO: handle invalid input.
            var d = scope.data;
            WikiDialog.runUiModal(d.templateUrl, d.controller, d.resolver, d.success);
	       }
       }
  }
})();
