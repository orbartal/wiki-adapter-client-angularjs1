(function () {
  'use strict';

  angular
    .module('wikiApp')
    .service('PageUtils', PageUtils);

    PageUtils.$inject = [];
    var config = null;

    function PageUtils() {
        var service = {};
        service.arrayToPage = arrayToPage;
        return service;

        function arrayToPage (source, page){
            if (!page){
                page = {'page' : 1, 'size' : 10};
            }
            var result = {};
            var start = (page.page - 1) * page.size;
            var end = page.page * page.size;
            var data = source.slice(start, end);
            result.content = data;
            result.last = (source.length<=page.page*page.size);
            result.totalElements = source.length;
            result.totalPages = Math.ceil(source.length/page.size);
            result.size =page.size;
            result.number =page.page;
            result.sort =null;
            result.first =(page.page==0);
            result.numberOfElements = source.length;
            result.numberOfElements = data.length;
            return result;
        }

	}//PageUtils
})();
