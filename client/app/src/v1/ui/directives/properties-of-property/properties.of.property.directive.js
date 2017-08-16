(function () {
    'use strict';

      angular
            .module('wikiApp')
            .directive('propertiesOfProperty', ['PropertiesService', propertiesOfProperty]); //, '$state' $state

      function propertiesOfProperty(PropertiesService){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {propertyName : '=', edit : '='};
            directive.templateUrl =
            	'/app/src/v1/ui/directives/properties-of-property/properties.of.property.directive.html';
            directive.replace = true;
            directive.controller = propertiesOfPropertyController;  //Leval 1 function
            directive.compile = propertiesOfPropertyCompile; //Leval 2 function
            directive.link = propertiesOfPropertyLinking; //Leval 3 function
            return directive;


	      function propertiesOfPropertyController($scope){
	      }

	      // function is executed once (1) for every instance of ui-jq in your original UNRENDERED template.
	      // Scope is UNAVAILABLE as the templates are only being cached. updatehour()
	      function propertiesOfPropertyCompile (element, attributes){
	            return this.link;
	      }

	      // Function is executed once (1) for every RENDERED instance.
	      // Scope IS available because controller logic has finished executing.
	      // All variables and expression values can finally be determined.
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
	    		  PropertiesService.updateProperty(scope.property).then(onSuccess, onFailure);

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
	    		  PropertiesService.getPropertyByName(scope.propertyName).then(onSuccess, onFailure);

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
