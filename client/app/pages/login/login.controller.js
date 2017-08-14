(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['LoginService'];
    function LoginCtrl(LoginService) {
        var vm = this;
        vm.login = login;

        function login() {
          LoginService.login (vm.username, vm.password);
        }
    }
})();
