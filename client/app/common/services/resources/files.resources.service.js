(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('FilesResourcesService', FilesResourcesService);

    FilesResourcesService.$inject = ['$q', 'toaster'];
    function FilesResourcesService($q, toaster) {
        var service = {};
        service.getById = getById;
        service.getAll = getAll;
        return service;

        ///////////////////////////

	    //Crud methods
        function getById(fileName) {
          var result = {"id" : id};
          return $q.when(result);
	    }

	    function getAll () {
        var file1 = {"id" : 1, "name": "file1", "type" : "image", "extension" : "jpg", "datetime" : "10:10:10"};
        var file2 = {"id" : 2, "name": "file2", "type" : "image", "extension" : "jpg", "datetime" : "10:10:10"};
        var file3 = {"id" : 3, "name": "file3", "type" : "image", "extension" : "jpg", "datetime" : "10:10:10"};
        var results = [file1, file2, file3];
        return $q.when(results);
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
