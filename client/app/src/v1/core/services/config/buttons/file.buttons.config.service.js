(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('FileButtonConfigService', FileButtonConfigService);

    FileButtonConfigService.$inject = ['$state', 'SiteConfigService', 'WikiDialog'];
    function FileButtonConfigService($state, SiteConfigService, WikiDialog) {
        var service = {};
        service.getTop = getTop;
        service.getRow = getRow;
        return service;

        function getTop (){
              var buttonClass = ["btn", "btn-primary", "btn-xs", "class-round-button", "class-right"];
              var btnCreate = {"title": "create", "buttonClass":buttonClass, "text" : "Add file",
                              "action": onCreate, "spanClass": ["glyphicon", "glyphicon-plus"]};
              var results = [btnCreate];
              return results;
        }//End getCreateButton

        function getRow (){
              var buttonClass = ["btn", "class-row-button", "class-right"];
              var btnView = {"title": "view", "buttonClass":buttonClass,
                              "action": onView, "spanClass": ["glyphicon", "glyphicon-eye-open"]};
              /*
              var btnUpdate = {"title": "update", "buttonClass":buttonClass,
                            "action": onEdit, "spanClass": ["glyphicon", "glyphicon-pencil"]};
              var btnDelete = {"title": "delete", "buttonClass":buttonClass,
                              "action": onDelete, "spanClass": ["glyphicon", "glyphicon-trash"]};
              */
              var results = [btnView]; //, btnUpdate, btnDelete
              return results;
        }

        function onCreate () {
              var objResolver =  {};
              var strTemplateUrl = "/app/pages/file/modal/create/modal.add.new.file.html";
              var strController = "AddNewFileCtrl as vm";
              var objSuccess = {title: "Created file successfully", body:""};
              WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
        }

        function onView (file) {
            $state.go('site.file-view', file);
        }

        function onEdit (sFile) {
              var objResolver =  {article :  sArticle};
              var strTemplateUrl = "app/src/v1/ui/modal/file/update/file.update.modal.html";
              var strController = "ModalEditFileCtrl as vm";
              var objSuccess = {title: "Update article successfully", body:"file"+sFile.id};
              WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
        }

        function onDelete (sFile) {
              var objResolver =  {article :  sArticle};
              var strTemplateUrl = "app/src/v1/ui/modal/file/delete/file.delete.modal.html";
              var strController = "ModalDeleteFileCtrl as vm";
              var objSuccess = {title: "Delete article successfully", body:"file"+sFile.id};
              WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
        }
    }
})();
