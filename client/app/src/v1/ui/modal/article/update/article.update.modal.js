(function () {
    'use strict';

	angular
		.module('wikiApp')
		.controller('ModalEditArticleCtrl',  ModalEditArticleCtrl);

	function ModalEditArticleCtrl($scope, $uibModalInstance, toaster, ArticlesDataService, article) {
		var vm = this;
		vm.save = save;
		vm.cancel = cancel;
		vm.article = {};
		vm.errorMessage = "";
		vm.tempArticle = null;
		active();

		////////////////

		function active() {
			vm.article = article;
			vm.tempArticle = {};
			angular.copy(vm.article,vm.tempArticle);
		}

		function save() {
 			vm.errorMessage = "";
 			delete vm.tempArticle.versionTime;
    		delete vm.tempArticle.mapPropertyToValue;
    		delete vm.tempArticle.categories;
 			ArticlesDataService.update(vm.tempArticle).then(onSuccess,onFailure);

			function onSuccess(){
				$uibModalInstance.close(vm.article);
			};

			function onFailure(error) {
				vm.errorMessage = error.message;
			};
		};

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		};
	}

})();
