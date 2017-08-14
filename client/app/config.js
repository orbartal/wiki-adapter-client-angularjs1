(function () {
    'use strict';

     angular.module('wikiApp').
     	config(config).
     	run(['$rootScope', '$state', run]);

     function run($rootScope, $state){
    	 $rootScope.$state = $state;
     }//End run

    //Config
    function config($stateProvider, $urlRouterProvider) {
    	$urlRouterProvider.otherwise("/home");
    	$stateProvider

      .state('site', {
	            url: "",
	            templateUrl: "/app/common/frame/wiki.frame.view.html",
	            controller: "FrameCtrl as vm",
	     })

	    	.state('site.home', {
	            url: "/home",
	            templateUrl: "/app/pages/home/home.view.html",
              controller: "HomeCtrl as vm",
	        })
    }
})();
