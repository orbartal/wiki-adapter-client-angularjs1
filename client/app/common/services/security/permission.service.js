(function () {
  'use strict';

  angular
    .module('wikiApp')
    .service('PermissionService', PermissionService);

    PermissionService.$inject = ['PermPermissionStore', 'AuthenticationService', 'WikiUtils'];
    function PermissionService(PermPermissionStore, AuthenticationService, WikiUtils) {
  		//Variables
  		var vm = this;
      vm.setConfig = setConfig ;

      function setConfig(){
            //	PermissionStore.clearStore();
           PermPermissionStore.definePermission('anonymous', isAnonymous);
           PermPermissionStore.definePermission('admin', isAdmin);

            function isAnonymous (stateParams) {
               var isAnonymous  = !AuthenticationService.getAuth();
               return isAnonymous;
            }//End configPermissionStore

            function isAdmin (stateParams) {
               var isAnonymous  = isAnonymous (stateParams);
               var user = AuthenticationService.getAuth();
               if ( WikiUtils.isEmptyObject (user) ||
                    WikiUtils.isEmptyObject (user) ||
                    WikiUtils.isEmptyObject (user.role)){
                 return false;
               }
               var result = WikiUtils.isEqualsText(user.role, 'Admin');
               return result;
            }//End isAdmin
         }//End configPermissionStore
	}
})();
