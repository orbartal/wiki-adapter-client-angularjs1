(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('FilesDataService', FilesDataService);

    FilesDataService.$inject = ['$q', 'PageUtils'];
    function FilesDataService($q, PageUtils) {
        var service = {};
        service.getById = getById;
        service.getAll = getAll;
        return service;

	    //public methods
        function getById(fileName) {
          var result = {"id" : id};
          return $q.when(result);
	    }

	    function getAll (page) {
            var file1 = {"id" : 1, "name": "afile1", "type" : "image", "extension" : "jpg", "datetime" : "10:10:10"};
            var file2 = {"id" : 2, "name": "bfile2", "type" : "image", "extension" : "gif", "datetime" : "10:10:10"};
            var file3 = {"id" : 3, "name": "afile3", "type" : "image", "extension" : "png", "datetime" : "20:10:10"};
            var files = [file1, file2, file3];
            var result = PageUtils.arrayToPage(files, page);
            return $q.when(result);
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
