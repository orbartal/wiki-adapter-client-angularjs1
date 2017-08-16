(function () {
  'use strict';

  angular
    .module('wikiApp')
    .service('AuthenticationService', AuthenticationService);

    function AuthenticationService($state) {
  		//Variables
  		var vm = this;
  		vm.currentUser = false;

  		//Methods
  		vm.getAuth = getAuth;
  		vm.setAuth = setAuth;
  		vm.clearCredentials = clearCredentials;

      function getAuth () {
          return vm.currentUser;
      }
      function setAuth (user) {
          vm.currentUser = user;
	    }
	    function clearCredentials() {
	    	  vm.currentUser = null;
	    }
	}
})();
