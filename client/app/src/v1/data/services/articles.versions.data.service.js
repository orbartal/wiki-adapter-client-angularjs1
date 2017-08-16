(function () {
    'use strict';

    angular
        .module('wikiApp')
        .factory('ArticlesVersionsResourcesService', ArticlesVersionsResourcesService);

    ArticlesVersionsResourcesService.$inject = ['$q', 'SiteConfigService', 'toaster'];
    function ArticlesVersionsResourcesService($q, SiteConfigService, toaster) {
        var service = {};
        service.getArticleHistory = getArticleHistory;
        service.getById = getById;
        return service;

        //Crud methods
        function getById(id) {
            var article1 = {"id" : 1, "name" : id,  "nameSpace": "main", "source" : "source1", "html": "html1", "datetime" : "10:10:10"};
              return $q.when(results);
          //return $http.get('/articles/history/'+id).then(onSuccess, onFailure);
        }

        function getArticleHistory(nameSpace, name) {
          var article1 = {"id" : 1, "name" : name,  "nameSpace": nameSpace, "source" : "source1", "html": "html1", "datetime" : "10:10:10"};
          var article2 = {"id" : 1, "name" : name, "nameSpace": nameSpace, "source" : "source1", "html": "html1", "datetime" : "11:10:11"};
          var results = [article1, article2];
          return $q.when(results);
        	//return $http.get('/articles/history/'+nameSpace+'/'+name).then(onSuccess, onFailure);
        }

     // private functions
        function onSuccess(result) {
        	return result.data;
        }

        function onFailure(error) {
            throw error.data;
        }
    }

})();
