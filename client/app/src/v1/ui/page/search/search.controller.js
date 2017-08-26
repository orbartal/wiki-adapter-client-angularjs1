(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$state', 'toaster', 'SearchDataService', 'WikiUtils'];

    function SearchCtrl ($state, toaster, SearchDataService, WikiUtils) {
        var vm = this;
        vm.items =[];
        vm.searchable = true;
        vm.query= "";
        vm.lastQuery = "";

        vm.search = search;
        vm.isSearchEnable = isSearchEnable;
        vm.goToArticle = goToArticle;

        function search () {
        	vm.items = [];
        	vm.lastQuery = vm.query;
        	vm.searchable = false;
        	SearchDataService.search(vm.query, vm.startResult, vm.endResult).then(onSuccess, onFailure);

        	function onSuccess(data) {
        		vm.items = data.items;
        		vm.searchable = true;
            }

            function onFailure(error) {
            	toaster.error({
         			title: 'Error',
 	                body: 'Failed to get search result due to error: ' + error.message,
 	            });
                vm.searchable = true;
            }
        }

        function goToArticle (item) {
        	var params = {nameSpace: '', name : item.title};
          	$state.go('site.article-read', params);
        }

        function isSearchEnable () {
        	var isEmpty = WikiUtils.isEmpty (vm.query);
        	var searchEnable =  vm.searchable && !isEmpty;
        	return searchEnable;
        }
    }
})();
