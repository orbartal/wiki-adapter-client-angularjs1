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
        var configTemp = {};
        config = configTemp;
        return config;
     }
	}
})();
