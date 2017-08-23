(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('JobButtonConfigService', JobButtonConfigService);

    JobButtonConfigService.$inject = ['$state', 'SiteConfigService', 'WikiDialog'];
    function JobButtonConfigService($state, SiteConfigService, WikiDialog) {
        var service = {};
        service.getTop = getTop;
        service.getRow = getRow;
        return service;

        function getTop (){
          var buttonClass = ["btn", "btn-primary", "btn-xs", "class-round-button", "class-right"];
          var btnCreate = {"title": "create", "buttonClass":buttonClass, "text" : "Add job",
                          "action": onCreateJob, "spanClass": ["glyphicon", "glyphicon-plus"]};
          var results = [btnCreate];
          return results;
    	  }//End getCreateButton

        function getRow (){
          var buttonClass = ["btn", "class-row-button", "class-right"];
          var btnView = {"title": "view", "buttonClass":buttonClass,
                          "action": onViewArticle, "spanClass": ["glyphicon", "glyphicon-eye-open"]};
          var btnDelete = {"title": "delete", "buttonClass":buttonClass,
                          "action": onDeleteJob, "spanClass": ["glyphicon", "glyphicon-stop"]};
          var results = [btnDelete];
          return results;
        }

        function onCreateJob () {
              var objResolver =  {};
              var strTemplateUrl = "/app/src/v1/ui/modal/job/create/job.create.modal.html";
              var strController = "JobCreateCtrl as vm";
              var objSuccess = {title: "Created job successfully", body:""};
              WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
          }

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

          function onDeleteJob (sJob) {
              var objResolver =  {job :  sJob};
              var strTemplateUrl = "app/src/v1/ui/modal/job/delete/job.delete.modal.html";
              var strController = "ModalDeleteJobCtrl as vm";
              var objSuccess = {title: "Delete job successfully", body:"job"+sJob.id};
              WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
          }
    }
})();
