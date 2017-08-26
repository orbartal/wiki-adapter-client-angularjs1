(function () {
  'use strict';

  angular
    .module('wikiApp')
    .service('LoginService', LoginService);

    LoginService.$inject = ['$state', 'TokensDataService', 'AuthenticationService'];
    function LoginService($state, TokensDataService, AuthenticationService) {
        var service = {};
        service.login = login;
        return service;

        function login(username, password) {
            var requst = {'username' : username, 'password' : password};
            TokensDataService.get (requst).then(onSuccess, onFailure);

            // private functions
            function onSuccess(response) {
                var userData = response.data; //{"name" : username, 'role' : 'admin'};
                AuthenticationService.setAuth(userData);
                $state.go("site.home");
            }

            function onFailure(error) {
            	throw error;
            }

        }
    }
})();
