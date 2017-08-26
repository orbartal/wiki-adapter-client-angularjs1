(function () {
  'use strict';

  angular
    .module('wikiApp')
    .service('SiteConfigService', SiteConfigService);

    SiteConfigService.$inject = [];

    var config = null;

    function SiteConfigService() {
		var service = {};
        service.reloadConfig = reloadConfig;
        service.getSiteConfig = getSiteConfig;
        service.config = reloadConfig();
        return service;

		 function getSiteConfig() {
			 return  config;
		 }

	   function reloadConfig() {
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

        var configTemp = {"mapLanguage" : mapLanguage, "languageDirection" : "ltr"};
        configTemp.isRtl = false;
        config = configTemp;
        return config;
     }
	}
})();
