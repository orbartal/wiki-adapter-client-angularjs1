(function () {
    'use strict';

    angular
        .module('wikiApp')
        .factory('PropertiesDataService', PropertiesDataService);

    PropertiesDataService.$inject = ['$q', 'PageUtils'];
    function PropertiesDataService($q, PageUtils) {
        var service = {};
        service.getAll = getAll;
        service.getById = getById;
        service.update = updateProperty;
        return service;

        //public methods
        function getAll(page) {
          var property1 = {"id" : 1};
          var property2 = {"id" : 2};
          var property3 = {"id" : 3};
          var properties = [property1, property2, property3];
          var result = PageUtils.arrayToPage(properties, page);
          return $q.when(result);
        }

        function getById(id) {
            var result = {"id" : id};
            return $q.when(result);
        }

        function updateProperty (property) {
            return $q.when(property);
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
