(function () {
    'use strict';

    angular
        .module('wikiApp')
        .factory('PropertiesResourcesService', PropertiesResourcesService);

    PropertiesResourcesService.$inject = ['$http', 'toaster'];
    function PropertiesResourcesService($http, toaster) {
        var service = {};

        //Crud
        service.getAll = getAll;
        service.getById = getById;
        service.update = updateProperty;
        return service;

        ///////////////////////////

        //Crud methods
        function getAll() {
            return $http.get('/properties').then(onSuccess, onFailure);
        }

        function getById(name) {
            return $http.get('/properties/getByName/'+name).then(onSuccess, onFailure);
        }

        function updateProperty (newProperty) {
            return $http.put('/properties', newProperty).then(onSuccess, onFailure);
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
