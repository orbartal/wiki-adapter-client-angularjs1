(function () {
    'use strict';

    angular
        .module('wikiApp')
        .factory('PropertiesDataService', PropertiesDataService);

    PropertiesDataService.$inject = ['$http', 'toaster'];
    function PropertiesDataService($http, toaster) {
        var service = {};

        //Crud
        service.getAll = getAll;
        service.getById = getById;
        service.update = updateProperty;
        return service;

        ///////////////////////////

        //Crud methods
        function getAll() {
          var property1 = {"id" : 1};
          var property2 = {"id" : 2};
          var property3 = {"id" : 3};
          var results = [property1, property2, property3];
          return $q.when(results);
        }

        function getById(id) {
            var result = {"id" : id};
            return $q.when(result);
        }

        function updateProperty (property) {
            return $q.when(property);
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
