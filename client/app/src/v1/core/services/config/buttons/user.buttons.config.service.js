(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('UserButtonConfigService', UserButtonConfigService);

    UserButtonConfigService.$inject = ['SiteConfigService', 'WikiDialog'];
    function UserButtonConfigService(SiteConfigService, WikiDialog) {
        var service = {};
        service.getTop = getTop;
        service.getRow = getRow;
        return service;

        function getTop (){
              var buttonClass = ["btn", "btn-primary", "btn-xs", "class-round-button", "class-right"];
              var btnCreate = {"title": "create", "buttonClass":buttonClass, "text" : "Add user",
                              "action": onCreate, "spanClass": ["glyphicon", "glyphicon-plus"]};
              var results = [btnCreate];
              return results;
        }//End getCreateButton

        function getRow (){
              var buttonClass = ["btn", "class-row-button", "class-right"];
              var btnUpdate = {"title": "update", "buttonClass":buttonClass,
                            "action": onEdit, "spanClass": ["glyphicon", "glyphicon-pencil"]};
              var btnDelete = {"title": "delete", "buttonClass":buttonClass,
                              "action": onDelete, "spanClass": ["glyphicon", "glyphicon-trash"]};
              var results = [btnUpdate, btnDelete];
              return results;
        }

        function onCreate () {
          var objResolver =  {};
          var strTemplateUrl =  '/app/src/v1/ui/modal/user/create/user.create.modal.html';
          var strController =  "UserCreateCtrl as vm";
          var objSuccess = {title: "Create user successfully", body:"user"};
          WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
        }

        function onEdit (sUser) {
          var objResolver =  {user :  sUser};
          var strTemplateUrl = '/app/src/v1/ui/modal/user/update/user.update.modal.html';
          var strController = "UserEditCtrl as vm";
          var objSuccess = {title: "Edit user successfully", body:"user"+sUser.id};
          WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
        }

        function onDelete (sUser) {
            var objResolver =  {user :  sUser};
            var strTemplateUrl = '/app/src/v1/ui/modal/user/delete/user.delete.modal.html';
            var strController = "UserDeleteCtrl as vm";
            var objSuccess = {title: "Delete user successfully", body:"user"+sUser.id};
            WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
        }
    }
})();
