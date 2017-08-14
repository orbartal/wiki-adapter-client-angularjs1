(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('FrameCtrl', FrameCtrl);

    FrameCtrl.$inject = [];

    function FrameCtrl() {
        var vm=this;
        vm.rightClass=['col-xs-10', 'col-sm-10', 'col-md-10', 'col-lg-10', 'class-frame-right-side'];
        vm.leftClass=['col-xs-2', 'col-sm-2', 'col-md-2', 'col-lg-2', 'class-dir-wiki-main-side-menu'];
        vm.toasterOptions = {'time-out': 3000, 'close-button': false, 'position-class': 'toast-bottom-full-width'};
        init();

        function init() {
        }
    }
})();
