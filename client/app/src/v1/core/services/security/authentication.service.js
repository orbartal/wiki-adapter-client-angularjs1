(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('AuthenticationService', AuthenticationService);

    function AuthenticationService() {
        var service = {};
        service.currentUser = false;
        service.getAuth = getAuth;
        service.setAuth = setAuth;
        service.clearCredentials = clearCredentials;
        return service;

        function getAuth () {
            return service.currentUser;
        }

        function setAuth (user) {
            service.currentUser = user;
        }

        function clearCredentials() {
            service.currentUser = null;
        }
    }//End AuthenticationService
})();
