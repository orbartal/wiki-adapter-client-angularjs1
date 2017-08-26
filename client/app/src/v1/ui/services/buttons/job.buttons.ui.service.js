(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('JobButtonConfigService', JobButtonConfigService);

    JobButtonConfigService.$inject = ['WikiDialog', 'ButtonConfigService'];
    function JobButtonConfigService(WikiDialog, ButtonConfig) {
        var service = {};
        service.getTop = getTop;
        service.getRow = getRow;
        return service;

        function getTop (){
          return ButtonConfig.get('top', {'create': onCreate});
    	}

        function getRow (){
          return ButtonConfig.get ('row', {'delete' : onDelete});
        }

        function onCreate () {
              var objResolver =  {};
              var strTemplateUrl = "/app/src/v1/ui/modal/job/create/job.create.modal.html";
              var strController = "JobCreateModalCtrl as vm";
              var objSuccess = {title: "Created job successfully", body:""};
              WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
          }

          function onDelete (sJob) {
              var objResolver =  {job :  sJob};
              var strTemplateUrl = "app/src/v1/ui/modal/job/delete/job.delete.modal.html";
              var strController = "JobDeleteModalCtrl as vm";
              var objSuccess = {title: "Delete job successfully", body:"job"+sJob.id};
              WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
          }
    }
})();
