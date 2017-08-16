(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('ArticleButtonConfigService', ArticleButtonConfigService);

    ArticleButtonConfigService.$inject = ['$state', 'SiteConfigService', 'WikiDialog'];
    function ArticleButtonConfigService($state, SiteConfigService, WikiDialog) {
        var service = {};
        service.getCreate = getCreate;
        service.getRow = getRow;
        return service;

        function getCreate (){
            var data = getCreateArticleData ();
            var options = getCreateOptions ();
            var result = {"data": data, "options":options};
          	return result;

            function getCreateArticleData (){
              var result = {};
              result.resolver =  {};
              result.templateUrl =  '/app/src/v1/ui/modal/article/create/article.create.modal.html';
              result.controller =  "ArticleCreateCtrl as vm";
              result.success = {title: "Create article successfully", body:""};
              return result;
            }

            function getCreateOptions (){
              var result = {};
              result.title = "create";
              result.buttonText = "create";
              result.buttonClass = ["btn", "btn-primary", "btn-xs", "class-round-button", "pull-right"];
              result.spanClass="glyphicon glyphicon-plus";
              return result;
            }
    	  }//End getCreateButton

        function getRow (){
          var buttonClass = ["btn", "class-row-button", "class-right"];
          var btnView = {"title": "view", "buttonClass":buttonClass,
                          "action": onViewArticle, "spanClass": ["glyphicon", "glyphicon-eye-open"]};
          var btnUpdate = {"title": "update", "buttonClass":buttonClass,
                        "action": onEditArticle, "spanClass": ["glyphicon", "glyphicon-pencil"]};
          var btnDelete = {"title": "delete", "buttonClass":buttonClass,
                          "action": onDeleteArticle, "spanClass": ["glyphicon", "glyphicon-trash"]};
          var results = [btnView, btnUpdate, btnDelete];
          return results;

          function onViewArticle (article) {
            var params = {nameSpace: article.nameSpace, name : article.name};
            if (article.isActive==false){
              params['isActive']=article.isActive;
              params['history']=article.isActive;
              params['versionTime']=article.versionTime;
            }
            $state.go('site.article-read', params);
          }

          function onEditArticle (sArticle) {
              var objResolver =  {article :  sArticle};
              var strTemplateUrl = "app/src/v1/ui/modal/article/update/article.update.modal.html";
              var strController = "ModalEditArticleCtrl as vm";
              var objSuccess = {title: "Update article successfully", body:"article"+sArticle.id};
              WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
          }

          function onDeleteArticle (sArticle) {
              var objResolver =  {article :  sArticle};
              var strTemplateUrl = "app/src/v1/ui/modal/article/delete/article.delete.modal.html";
              var strController = "ModalDeleteArticleCtrl as vm";
              var objSuccess = {title: "Delete article successfully", body:"article"+sArticle.id};
              WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
          }
        }//End getRowButtons
    }
})();
