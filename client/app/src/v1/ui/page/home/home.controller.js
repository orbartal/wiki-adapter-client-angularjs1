(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = [];
    function HomeCtrl() {
        var vm = this;
        vm.currentLoginUser = null;
        init();

        function init() {
        	vm.currentLoginUser = {};
            vm.currentLoginUser.name = "orbartal";
        }
    }
})();
