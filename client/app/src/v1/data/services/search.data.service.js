(function () {
    'use strict';

    angular
        .module('wikiApp')
        .factory('SearchDataService', SearchDataService);

    SearchDataService.$inject = ['$q'];

    function SearchDataService($q) {
    	var service = {};
        service.search = search;
        return service;

        function search(query, start, end) {
            var searchItem1 = {"id" : 1, "index" : 1, "score" : 0.1, "title": "title1", "highlighText": "bla <b>query</b> bla"};
            var searchItem2 = {"id" : 2, "index" : 2, "score" : 0.5, "title": "title2", "highlighText": "yda <b>query</b> yada"};
            var items = [searchItem1, searchItem2];
            var results = {"count" : 2, "start" : start, "end" : end, "query" : query, "items": items};
            return $q.when(results);
        }

        // private functions
        function onSuccess(result) {
        	return result.data;
        }

        function onFailure(error) {
        	if (error.data){
        		throw error.data;
        	}else{
                throw error;
        	}
        }
    }

})();
