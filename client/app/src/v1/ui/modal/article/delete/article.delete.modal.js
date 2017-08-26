(function () {
    'use strict';

	angular
		.module('wikiApp')
		.controller('ArticleDeleteModalCtrl', ['$uibModalInstance', 'ArticlesDataService', 'article', ArticleDeleteModalCtrl]);

	function ArticleDeleteModalCtrl ($uibModalInstance, ArticlesDataService, article) {
		var vm = this;
		vm.article = null;
		vm.ok = ok;
		vm.cancel = cancel;
		vm.errorMessage = "";
		activate();

		function activate() {
			vm.article = article;
		}

		function ok() {

			vm.errorMessage = "";

			ArticlesDataService.delete(article).then(onSuccess,onFailure);

			function onSuccess() {
				$uibModalInstance.close(vm.article);
			};

			function onFailure(error) {
				vm.errorMessage = error.data.message;
			};
		};

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		};
	}

})();
