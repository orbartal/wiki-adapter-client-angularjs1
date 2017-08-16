(function () {
  'use strict';

  angular
    .module('wikiApp')
    .service('LoginService', LoginService);

    LoginService.$inject = ['$state', 'AuthenticationService'];
    function LoginService($state, AuthenticationService) {
    		//Variables
    		var vm = this;
    		//Methods
    		vm.login = login;


        function login(username, password) {
            var userData = {"name" : username, 'role' : 'admin'}; //TODO: remove
            AuthenticationService.setAuth(userData);
    			 // SiteConfigService.getSiteConfig();
            $state.go("site.home");
        }
    }
})();
