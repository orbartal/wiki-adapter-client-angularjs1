(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('ArticleButtonUiService', ArticleButtonUiService);

    ArticleButtonUiService.$inject = ['$state', 'DialogUiService', 'ButtonUiService'];
    function ArticleButtonUiService($state, DialogUiService, ButtonConfig) {
        var service = {};
        service.getTop = getTop;
        service.getRow = getRow;
        return service;

        function getTop (){
            return ButtonConfig.get('top', {'create': onCreate});
        }

        function getRow (){
             return ButtonConfig.get ('row', {'view' : onView, 'update': onUpdate, 'delete': onDelete});
        }

        function onCreate () {
              var objResolver =  {};
              var strTemplateUrl = "/app/src/v1/ui/modal/article/create/article.create.modal.html";
              var strController = "ArticleCreateModelCtrl as vm";
              var objSuccess = {title: "Created article successfully", body:""};
              DialogUiService.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
          }

          function onView (article) {
            var params = {nameSpace: article.nameSpace, name : article.name};
            if (article.isActive==false){
              params['isActive']=article.isActive;
              params['history']=article.isActive;
              params['versionTime']=article.versionTime;
            }
            $state.go('site.article-read', params);
          }

          function onUpdate (sArticle) {
              var objResolver =  {article :  sArticle};
              var strTemplateUrl = "app/src/v1/ui/modal/article/update/article.update.modal.html";
              var strController = "ArticleUpdateModalCtrl as vm";
              var objSuccess = {title: "Update article successfully", body:"article"+sArticle.id};
              DialogUiService.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
          }

          function onDelete (sArticle) {
              var objResolver =  {article :  sArticle};
              var strTemplateUrl = "app/src/v1/ui/modal/article/delete/article.delete.modal.html";
              var strController = "ArticleDeleteModalCtrl as vm";
              var objSuccess = {title: "Delete article successfully", body:"article"+sArticle.id};
              DialogUiService.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
          }
    }
})();
