(function () {
    'use strict';

    angular
        .module('wikiApp')
        .factory('ArticlesVersionsDataService', ArticlesVersionsDataService);

    ArticlesVersionsDataService.$inject = ['$q'];
    function ArticlesVersionsDataService($q) {
        var service = {};
        service.getArticleHistory = getArticleHistory;
        service.getById = getById;
        return service;

        //public methods
        function getById(id) {
            var article1 = {"id" : 1, "name" : id,  "nameSpace": "main", "source" : "source1", "html": "html1", "datetime" : "10:10:10"};
              return $q.when(results);
        }

        function getArticleHistory(nameSpace, name) {
          var article1 = {"id" : 1, "name" : name,  "nameSpace": nameSpace, "source" : "source1", "html": "html1", "datetime" : "10:10:10"};
          var article2 = {"id" : 1, "name" : name, "nameSpace": nameSpace, "source" : "source1", "html": "html1", "datetime" : "11:10:11"};
          var results = [article1, article2];
          return $q.when(results);
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
