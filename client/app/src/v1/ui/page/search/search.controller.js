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
        vm.count = 0;
        vm.numberOfPages = 1;
        vm.itemsPerPage = 10;
        vm.startResult = 0;
        vm.endResult = 10;

        vm.search = function() {
        	search (0, 9)
        }

        vm.goToArticle = function(item) {
        	var params = {nameSpace: '', name : item.title};
          	$state.go('site.article-read', params);
        }

        vm.isSearchEnable = function(item) {
        	var isEmpty = WikiUtils.isEmpty (vm.query);
        	var searchEnable =  vm.searchable && !isEmpty;
        	return searchEnable;
        }

        vm.changePage = function(page) {
        	page = page - 1;
        	vm.startResult = page * vm.itemsPerPage;
        	vm.endResult = vm.startResult + vm.itemsPerPage;
        	search (vm.startResult, vm.endResult);
        }

        function search (start, end) {
        	vm.items = [];
        	vm.lastQuery = vm.query;
        	vm.searchable = false;
        	SearchDataService.search(vm.query, vm.startResult, vm.endResult).then(onSuccess, onFailure);

        	function onSuccess(data) {
        		vm.items = data.items;
        		vm.count = data.count;
        		vm.numberOfPages = Math.ceil(vm.count/vm.itemsPerPage);
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
    }
})();
