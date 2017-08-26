(function () {
    'use strict';

	angular
		.module('wikiApp')
		.controller('ArticleCreateModelCtrl', ['$uibModalInstance', 'ArticlesDataService', ArticleCreateModelCtrl]);

	function ArticleCreateModelCtrl ($uibModalInstance, ArticlesDataService) {
		var vm = this;
		vm.create = create;
		vm.cancel = cancel;
		vm.errorMessage = "";
		init();

		function init() {
				vm.article = {};
		}

		function create() {
 			vm.errorMessage = "";
 			ArticlesDataService.create(vm.article).then(onSuccess,onFailure);

			function onSuccess(){
				$uibModalInstance.close(vm.article);
			}

			function onFailure(error) {
				vm.errorMessage = error.data.message;
			}
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}

})();
