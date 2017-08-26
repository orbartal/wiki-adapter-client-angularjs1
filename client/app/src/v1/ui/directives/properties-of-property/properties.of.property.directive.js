(function () {
    'use strict';

      angular
            .module('wikiApp')
            .directive('propertiesOfProperty', ['PropertiesDataService', propertiesOfProperty]); //, '$state' $state

      function propertiesOfProperty(PropertiesDataService){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {propertyName : '=', edit : '='};
            directive.templateUrl =
            	'/app/src/v1/ui/directives/properties-of-property/properties.of.property.directive.html';
            directive.replace = true;
            directive.link = propertiesOfPropertyLinking; //Leval 3 function
            return directive;

	      function propertiesOfPropertyLinking(scope, element, attrs, ctrl){
	    	  scope.reset = reset;
	    	  scope.save = save;
	    	  scope.arrTF = [];

	    	  active();

	    	  function active (){
	    		  scope.arrTF = [{value: true, name: 'true'},{value: false, name: 'false'}];
	    		  getPropertyByName();
	    	  }

	    	  function save() {
	    		  PropertiesDataService.updateProperty(scope.property).then(onSuccess, onFailure);

	          	function onSuccess (property) {
	                  scope.property = property;
	              }

	          	function onFailure (error) {
	          		toaster.error({
	          			title: 'Error',
	  	                body: 'Failed to update property due to error: ' + error.message,
	  	            });
	              }
	          }

	    	  function reset() {
	    		  getPropertyByName();
	    	  }

	    	  function getPropertyByName() {
	    		  PropertiesDataService.getPropertyByName(scope.propertyName).then(onSuccess, onFailure);

	          	function onSuccess (property) {
	                  scope.property = property;
	              }

	          	function onFailure (error) {
	          		toaster.error({
	          			title: 'Error',
	  	                body: 'Failed to get property due to error: ' + error.message,
	  	            });
	              }
	          }
	      }
      }
})();
