(function () {
  'use strict';

  angular
    .module('wikiApp')
    .service('LanguageConfigService', LanguageConfigService);

    LanguageConfigService.$inject = [];
    function LanguageConfigService() {

        var mapLanguage = getLanguage();
        var service = {};
        service.get = get;
        service.getMap = getMap;
        service.isLtr = isLtr;
        service.isRtl = isRtl;
        return service;

        function isLtr () {
            return !isRtl();
        }

        function isRtl() {
            return false;
        }

        function getMap(keys){
            var result = {};
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = get(key);
                result[key]=value;
            }
            return result;
        }

        function get(key) {
           var result = mapLanguage[key];
           if (!result){
               return key;
           }
           return key;
       }

       function getLanguage() {
            var mapLanguage = {};
            mapLanguage.id = "id";
            mapLanguage.name = "name";
            mapLanguage.datetime = "datetime";
            mapLanguage.nameSpace = "nameSpace";
            mapLanguage.actions = "actions";
            mapLanguage.categories = "categories";
            mapLanguage.addArticle = "addArticle";
            mapLanguage.articleTabRead = "Read";
            mapLanguage.articleTabViewSource = "Source";
            mapLanguage.articleTabEditSource = "Edit";
            mapLanguage.articleTabEditWysiwyg = "Wysiwyg";
            mapLanguage.articleTabRename = "Rename";
            mapLanguage.articleTabHistory = "History";
            mapLanguage.btnSave = "btnSave";
            mapLanguage.btnReset = "btnReset";
            mapLanguage.sourceLanguage="source code language";
            mapLanguage.import = "import";
            mapLanguage.export = "export";
            return mapLanguage;
     }//End getLanguage
     
 }//End LanguageConfigService
})();
