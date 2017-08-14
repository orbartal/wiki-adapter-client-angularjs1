(function () {
    'use strict';

    angular
        .module('wikiApp')
        .factory('FilesResourcesService', FilesResourcesService);

    FilesResourcesService.$inject = ['$http', 'toaster'];
    function FilesResourcesService($http, toaster) {
        var service = {};
        service.getById = getById;
        service.getAll = getAll;
        return service;

        ///////////////////////////

	    //Crud methods
        function getById(fileName) {
	        return $http.get('/files/info/'+fileName).then(onSuccess, onFailure);
	    }

	    function getAllFiles() {
	        return $http.get('/files').then(onSuccess, onFailure);
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
