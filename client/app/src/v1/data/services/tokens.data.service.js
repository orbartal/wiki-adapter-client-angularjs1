(function () {
    'use strict';

    angular
        .module('wikiApp')
        .factory('TokensDataService', TokensDataService);

    TokensDataService.$inject = ['$q'];
    function TokensDataService ($q) {
    	var service = {};
        service.get = get;
        return service;

        //public methods
        function get (requst) {
            var userData = {"name" : username, 'role' : 'admin'};
            var sign = "BlaBla";
            var result = {"data" : userData, "sign" : sign};
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
