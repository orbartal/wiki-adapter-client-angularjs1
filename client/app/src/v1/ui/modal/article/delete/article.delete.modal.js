(function () {
    'use strict';

	angular
		.module('wikiApp')
		.controller('ModalDeleteArticleCtrl', ModalDeleteArticleCtrl);

	function ModalDeleteArticleCtrl ($scope, $uibModalInstance, ArticlesResourcesService, article) {
		var vm = this;
		vm.article = null;
		vm.ok = ok;
		vm.cancel = cancel;
		vm.errorMessage = "";
		activate();

		////////////////

		function activate() {
			vm.article = article;
		}

		function ok() {

			vm.errorMessage = "";

			ArticlesResourcesService.delete(article).then(onDeleteSuccess,onDeleteFailure);

			function onDeleteSuccess() {
				$uibModalInstance.close(vm.article);
			};

			function onDeleteFailure(error) {
				vm.errorMessage = error.message;
			};
		};

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		};
	}

})();
