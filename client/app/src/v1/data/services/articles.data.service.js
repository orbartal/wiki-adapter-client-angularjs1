(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('ArticlesDataService', ArticlesDataService);

    ArticlesDataService.$inject = ['$q', 'PageUtils'];
    function ArticlesDataService($q, PageUtils) {
        var service = {};
        service.getAll = getAll;
        service.getById = getById;
        service.create = createArticle;
        service.update = updateArticle;
        service.delete = deleteArticle;
        return service;

        //public methods
        function getAll(page) {
              var article1 = {"id" : 1, "name" : "article1", "nameSpace":"main", "source" : "source1", "html": "<h1>html</h1>", "datetime" : "11:10:11"};
              var article2 = {"id" : 2, "name" : "file1", "nameSpace":"main", "source" : "source2", "html": "<h1>html</h1>", "datetime" : "11:10:11"};
              var article3 = {"id" : 3, "name" : "source1",  "nameSpace":"category", "source" : "source3", "html": "<h1>html</h1>", "datetime" : "10:10:10"};
              var article4 = {"id" : 4, "name" : "property",  "nameSpace":"property", "source" : "source4", "html": "<h1>html</h1>", "datetime" : "10:10:10"};
              var article5 = {"id" : 5, "name" : "article5", "nameSpace":"main", "source" : "source1", "html": "<h1>html5</h1>", "datetime" : "11:10:11"};
              var article6 = {"id" : 6, "name" : "article6", "nameSpace":"main", "source" : "source1", "html": "<h1>html6</h1>", "datetime" : "11:10:11"};
              var article7 = {"id" : 7, "name" : "article7", "nameSpace":"main", "source" : "source1", "html": "<h1>html7</h1>", "datetime" : "11:10:11"};
              var articles = [article1, article2, article3, article4, article5, article6, article7];
              var result = PageUtils.arrayToPage(articles, page);
              return $q.when(result);
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

        //private functions
        function onSuccess(result) {
        	return result;
        }

        function onFailure(error) {
            throw error;
        }
    }

})();
