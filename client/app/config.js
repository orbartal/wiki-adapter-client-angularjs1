(function () {
    'use strict';

     angular.module('wikiApp').
     	config(config).
     	run(['$rootScope', '$state', 'PermissionService',  run]);

     function run($rootScope, $state, PermissionService){
       PermissionService.setConfig ();
    	 $rootScope.$state = $state;
     }//End run

    //Config
    function config($stateProvider, $urlRouterProvider) {
    	$urlRouterProvider.otherwise("/home");
    	$stateProvider

      .state('login', {
	            url: "/login",
	            templateUrl: "/app/pages/login/login.view.html",
	            controller: "LoginCtrl as vm"
	     })

      .state('site', {
	            url: "",
	            templateUrl: "/app/common/frame/wiki.frame.view.html",
	            controller: "FrameCtrl as vm",
              data: {
                 permissions: {
                    except: 'anonymous',
                    redirectTo: 'login'
                 }
              }
	     })

	    .state('site.home', {
	            url: "/home",
	            templateUrl: "/app/pages/home/home.view.html",
              controller: "HomeCtrl as vm",
	     })

       .state('site.users', {
                url: "/users",
                templateUrl: "/app/pages/users/users.view.html",
                controller: "UsersCtrl as vm",
        })
    }
})();
