(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = [];
    function LoginCtrl() {
        var vm = this;
        vm.login = login;

        function login() {
          alert ('login');
            //vm.dataLoading = true;
            //LoginService.login(vm.username, vm.password);
        }
    }
})();
