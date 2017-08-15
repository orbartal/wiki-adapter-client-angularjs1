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
        mapLanguage.name = "name";
        mapLanguage.datetime = "datetime";
        mapLanguage.nameSpace = "nameSpace";
        mapLanguage.actions = "actions";
        var configTemp = {"mapLanguage" : mapLanguage, "languageDirection" : "ltr"};
        config = configTemp;
        return config;
     }
	}
})();
