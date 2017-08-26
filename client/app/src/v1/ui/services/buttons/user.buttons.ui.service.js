(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('UserButtonConfigService', UserButtonConfigService);

    UserButtonConfigService.$inject = ['WikiDialog', 'ButtonConfigService'];
    function UserButtonConfigService(WikiDialog, ButtonConfig) {
        var service = {};
        service.getTop = getTop;
        service.getRow = getRow;
        return service;

        function getTop (){
              return ButtonConfig.get('top', {'create': onCreate});
        }

        function getRow (){
             return ButtonConfig.get('row', {'update': onUpdate, 'delete': onDelete});
        }

        function onCreate () {
          var objResolver =  {};
          var strTemplateUrl =  '/app/src/v1/ui/modal/user/create/user.create.modal.html';
          var strController =  "UserCreateModalCtrl as vm";
          var objSuccess = {title: "Create user successfully", body:"user"};
          WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
        }

        function onUpdate (sUser) {
          var objResolver =  {user :  sUser};
          var strTemplateUrl = '/app/src/v1/ui/modal/user/update/user.update.modal.html';
          var strController = "UserUpdateModalCtrl as vm";
          var objSuccess = {title: "Edit user successfully", body:"user"+sUser.id};
          WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
        }

        function onDelete (sUser) {
            var objResolver =  {user :  sUser};
            var strTemplateUrl = '/app/src/v1/ui/modal/user/delete/user.delete.modal.html';
            var strController = "UserDeleteModalCtrl as vm";
            var objSuccess = {title: "Delete user successfully", body:"user: "+sUser.name};
            WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
        }
    }
})();
