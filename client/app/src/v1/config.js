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
      var dirPath = "/app/src/v1/ui/page/";
       var dirTestPath = "/app/test/v1/ui/page/";
      $stateProvider

      .state('login', {
	            url: "/login",
	            templateUrl:  dirPath.concat("login/login.view.html"),
	            controller: "LoginCtrl as vm"
	     })

      .state('site', {
	            url: "",
	            templateUrl: dirPath.concat("site/site.frame.view.html"),
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
	            templateUrl: dirPath.concat("home/home.view.html"),
              controller: "HomeCtrl as vm",
	     })

         .state('site.search', {
	            url: "/search",
	            templateUrl: dirPath.concat("search/search.view.html"),
	            controller: "SearchCtrl as vm"
	        })

       .state('site.users', {
                url: "/users",
                templateUrl:  dirPath.concat("users/users.view.html"),
                controller: "UsersCtrl as vm",
        })

        .state('site.files', {
                 url: "/files",
                 templateUrl: dirPath.concat("files/files.view.html"),
                 controller: "FilesCtrl as vm",
         })

         .state('site.file-view', {
            	url: "/file/view/{name}/?{isActive:bool}/{versionTime:int}",
                templateUrl: dirPath.concat("file/view/file.view.view.html"),
                controller: "ViewFileCtrl as vm",
          })

          .state('site.articles', {
                url: "/articles",
                templateUrl: dirPath.concat("articles/articles.view.html"),
                controller: "ArticlesCtrl as vm"
            })

            .state('site.article-read', {
              url: "/article/read/{nameSpace}/{name}/?{isActive:bool}&{versionTime:int}",
                templateUrl: dirPath.concat("article/read/article.read.view.html"),
                controller: "ReadArticleCtrl as vm",
            })

            .state('site.article-rename', {
              url: "/article/read/{nameSpace}/{name}/?{isActive:bool}&{versionTime:int}",
                templateUrl: dirPath.concat("article/rename/article.rename.view.html"),
                controller: "RenameArticleCtrl as vm",
            })

            .state('site.article-edit-source', {
                url: "/article/edit/source/{nameSpace}/{name}/?{isActive:bool}&{versionTime:int}",
                templateUrl: dirPath.concat("article/edit-source/article.edit.source.view.html"),
                controller: "EditSourceArticleCtrl as vm",
            })

            .state('site.article-history', {
                url: "/article/history/{nameSpace}/{name}",
                templateUrl: dirPath.concat("article/history/article.history.view.html"),
                controller: "ArticleHistoryCtrl as vm",
            })

            .state('site.jobs', {
                url: "/jobs",
                templateUrl: dirPath.concat("jobs/jobs.view.html"),
                controller: "JobsCtrl as vm",
            })

            .state('site.import', {
               url: "/import",
               templateUrl: dirPath.concat("import/import.view.html"),
               controller: "ImportCtrl as vm",
           })

           .state('site.export', {
               url: "/export",
               templateUrl: dirPath.concat("export/export.view.html"),
               controller: "ExportCtrl as vm",
           })
    }
})();
