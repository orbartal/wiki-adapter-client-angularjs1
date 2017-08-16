(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('ButtonConfigService', ButtonConfigService);

    ButtonConfigService.$inject = ['SiteConfigService'];
    function ButtonConfigService(SiteConfigService) {
        var service = {};
        service.getCreateArticle = getCreateArticle;
        return service;

        function getCreateArticle (){
            var data = getCreateArticleData ();
            var options = getCreateOptions ();
            var result = {"data": data, "options":options};
          	return result;
    	  }

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
    }
})();
