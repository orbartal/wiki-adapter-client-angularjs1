(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('ArticlesDataService', ArticlesDataService);

    ArticlesDataService.$inject = ['$q', 'toaster'];
    function ArticlesDataService($q, toaster) {
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
              var article1 = {"id" : 1, "name" : "article1", "nameSpace":"main", "source" : "source1", "html": "<h1>html</h1>", "datetime" : "11:10:11"};
              var article2 = {"id" : 1, "name" : "file1", "nameSpace":"main", "source" : "source2", "html": "<h1>html</h1>", "datetime" : "11:10:11"};
              var article3 = {"id" : 1, "name" : "source1",  "nameSpace":"category", "source" : "source3", "html": "<h1>html</h1>", "datetime" : "10:10:10"};
              var article4 = {"id" : 1, "name" : "property",  "nameSpace":"property", "source" : "source4", "html": "<h1>html</h1>", "datetime" : "10:10:10"};
              var results = [article1, article2, article3, article4];
              return $q.when(results);
        }

        function getById(id) {
          var result = {"id" : id, "name" : id,  "nameSpace":"main", "source" : "source1", "html": "<h1>html</h1>", "datetime" : "10:10:10"};
          return $q.when(result);
        }

        function createArticle(nameSpace, name) {
           var result = {"id" : 1, "name" : name,  "nameSpace":nameSpace, "source" : "source1", "html": "html1"};
        	 return $q.when(result);
        }

        function updateArticle(article) {
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
