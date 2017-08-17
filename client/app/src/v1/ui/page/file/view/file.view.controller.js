(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('ViewFileCtrl', ViewFileCtrl);

    ViewFileCtrl.$inject = ['$scope', '$state' , '$stateParams', 'FilesDataService', 'SiteConfigService' , 'toaster', '$uibModal'];

    function ViewFileCtrl($scope, $state, $stateParams, FilesDataService, SiteConfigService, toaster, $uibModal){
        var vm = this;
        vm.width = 250;
        vm.height = 250;
        vm.file = null;
        init();

        function init() {
          vm.fileUrl = "https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg"; //TODO: remove
          vm.file = {"type" : "image"};
          //FilesDataService.getFileByName($stateParams.name).then(onSuccess, onFailure);

          	function onSuccess (file1) {
          		vm.file = file1;
          		vm.fileUrl = "/files/file/view/"+vm.file.name+"/" + vm.width + "/" + vm.height;
          		if (vm.file.isActive==false){
          			vm.fileUrl = "/files/file/view/"+vm.file.name+"/"
          				+  file1.versionTime + "/"
          				+ vm.width + "/" + vm.height;
          		}
            }

          	function onFailure (error) {
          		toaster.error({
          			title: 'Error',
  	                body: 'Failed to get file due to error: ' + error.message,
  	            });
              }
        }
    }
})();
