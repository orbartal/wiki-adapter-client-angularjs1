(function () {
    'use strict';

	angular
		.module('wikiApp')
		.controller('ModalCreateArticleCtrl',  ModalCreateArticleCtrl);

	function ModalCreateArticleCtrl ($scope, $uibModalInstance, ArticlesResourcesService, toaster, article) {
		var vm = this;
		vm.create = create;
		vm.cancel = cancel;
		vm.errorMessage = "";
		activate();

		////////////////

		function activate() {
			if (article){
				vm.article = article;
			}else{
				vm.article = {};
			}
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
