(function () {
    'use strict';

    angular
        .module('wikiApp')
        .factory('ArticlesVersionsResourcesService', ArticlesVersionsResourcesService);

    ArticlesVersionsResourcesService.$inject = ['$http', 'SiteConfigService', 'toaster'];
    function ArticlesVersionsResourcesService($http, SiteConfigService, toaster) {
        var service = {};
        service.getAll = getAll;
        service.getById = getById;
        return service;

        //Crud methods
        function getById(id) {
        	return $http.get('/articles/history/'+id).then(onSuccess, onFailure);
        }

        function getAll(nameSpace, name) {
        	return $http.get('/articles/history/'+nameSpace+'/'+name).then(onSuccess, onFailure);
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
