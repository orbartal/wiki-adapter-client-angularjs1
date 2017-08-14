(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('ArticlesResourcesService', ArticlesResourcesService);

    ArticlesResourcesService.$inject = ['$http', 'toaster'];
    function ArticlesResourcesService($http, toaster) {
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
            var results = [];
            return results;
        }

        function getById(id) {
          var result = {"id" : id};
          return results;
        }

        function createArticle(nameSpace, name) {
        	return getById(name).then(onSuccess, onFailure);
        }

        function updateArticle(newArticle) {
            return getById(newArticle.name).then(onSuccess, onFailure).then(onSuccess, onFailure);
        }

        function deleteArticle(article) {
            return getById(name).then(onSuccess, onFailure);
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
