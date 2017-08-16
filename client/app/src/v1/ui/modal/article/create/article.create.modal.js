(function () {
    'use strict';

	angular
		.module('wikiApp')
		.controller('ArticleCreateCtrl',  ArticleCreateCtrl);

	function ArticleCreateCtrl ($scope, $uibModalInstance, ArticlesResourcesService) {
		var vm = this;
		vm.create = create;
		vm.cancel = cancel;
		vm.errorMessage = "";
		init();

		////////////////

		function init() {
				vm.article = {};
		}

		function create() {
 			vm.errorMessage = "";
 			ArticlesResourcesService.create(vm.article).then(onUpdateSuccess,onUpdateFailure);

			function onUpdateSuccess(){
				$uibModalInstance.close(vm.article);
			}

			function onUpdateFailure(error) {
				vm.errorMessage = error.message;
			}
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}

})();