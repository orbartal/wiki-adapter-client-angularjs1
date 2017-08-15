(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('ArticlesResourcesService', ArticlesResourcesService);

    ArticlesResourcesService.$inject = ['$q', 'toaster'];
    function ArticlesResourcesService($q, toaster) {
        var service = {};
        //Crud
        service.getAll = getAll;
        service.getById = getById;
        service.create = createArticle;
        service.update = updateArticle;
        service.delete = deleteArticle;
        return service;
        ///////////////////////////

        // /Rest/V1/Wikis/{wikiId}/Spaces/{spaceId}/Articles

        //Crud methods
        function getAll() {
              var article1 = {"id" : 1, "name" : "title1",  "nameSpace":"category", "source" : "source1", "html": "html1", "datetime" : "10:10:10"};
              var article2 = {"id" : 1, "name" : "title2", "nameSpace":"main", "source" : "source1", "html": "html1", "datetime" : "11:10:11"};
              var results = [article1, article2];
              return $q.when(results);
        }

        function getById(id) {
          var result = {"id" : id};
          return $q.when(result);
        }

        function createArticle(nameSpace, name) {
           var result = {"id" : 1, "title" : "title1", "source" : "source1", "html": "html1"};
        	 return $q.when(result);
        }

        function updateArticle(article) {
        //  var result = {"id" : 1, "title" : "title1", "source" : "source1", "html": "html1"};
          return $q.when(article);
        }

        function deleteArticle(article) {
            return $q.when(article);
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
