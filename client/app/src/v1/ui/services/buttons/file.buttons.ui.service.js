(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('FileButtonUiService', FileButtonUiService);

    FileButtonUiService.$inject = ['$state', 'DialogUiService', 'ButtonUiService'];
    function FileButtonUiService($state, DialogUiService, ButtonConfig) {
        var service = {};
        service.getTop = getTop;
        service.getRow = getRow;
        return service;

        function getTop (){
              return ButtonConfig.get('top', {'create': onCreate});
        }

        function getRow (){
            return ButtonConfig.get ('row', {'view' : onView});
        }

        function onCreate () {
              var objResolver =  {};
              var strTemplateUrl = "/app/pages/file/modal/create/modal.add.new.file.html";
              var strController = "FileCreateModalCtrl as vm";
              var objSuccess = {title: "Created file successfully", body:""};
              DialogUiService.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
        }

        function onView (file) {
            $state.go('site.file-view', file);
        }
    }
})();
