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
    function config($stateProvider, $urlRouterProvider, $qProvider) {
      //https://github.com/christopherthielen/ui-router-extras/issues/356
      $qProvider.errorOnUnhandledRejections(false);
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

        .state('site.files', {
                 url: "/files",
                 templateUrl: "/app/pages/files/files.view.html",
                 controller: "FilesCtrl as vm",
         })

         .state('site.file-view', {
            	url: "/file/view/{name}/?{isActive:bool}/{versionTime:int}",
                templateUrl: "/app/pages/files/file/view/file.view.html",
                controller: "ViewFileCtrl as vm",
          })

          .state('site.articles', {
                url: "/articles",
                templateUrl: "/app/pages/articles/articles.view.html",
                controller: "ArticlesCtrl as vm"
            })

            .state('site.article-read', {
              url: "/article/read/{nameSpace}/{name}/?{isActive:bool}&{versionTime:int}",
                templateUrl: "/app/pages/articles/article/read/article.read.html",
                controller: "ReadArticleCtrl as vm",
            })

            .state('site.article-rename', {
              url: "/article/read/{nameSpace}/{name}/?{isActive:bool}&{versionTime:int}",
                templateUrl: "/app/pages/articles/article/rename/article.rename.html",
                controller: "RenameArticleCtrl as vm",
            })

            .state('site.article-view-source', {
                url: "/article/view/source/{nameSpace}/{name}/?{isActive:bool}&{versionTime:int}",
                templateUrl: "/app/pages/articles/article/view-source/article.view.source.html",
                controller: "EditSourceArticleCtrl as vm",
            })

            .state('site.article-edit-source', {
                url: "/article/edit/source/{nameSpace}/{name}/?{isActive:bool}&{versionTime:int}",
                templateUrl: "/app/pages/articles/article/edit-source/article.edit.source.html",
                controller: "EditSourceArticleCtrl as vm",
            })

            .state('site.article-history', {
                url: "/article/history/{nameSpace}/{name}",
                templateUrl: "/app/pages/articles/article/history/article.history.html",
                controller: "ArticleHistoryCtrl as vm",
            })
    }
})();
