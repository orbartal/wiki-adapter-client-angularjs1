﻿(function () {
    'use strict';

    angular
        .module('wikiApp')
        .controller('UsersCtrl', UsersCtrl);

    UsersCtrl.$inject = ['$scope', 'WikiDialog', 'toaster', 'UsersResourcesService'];

    function UsersCtrl($scope, WikiDialog,  toaster, UsersResourcesService) {
        var vm = this;
        vm.allUsers = [];
		    vm.displayUsers = [];

        vm.getAll = getAll;
        vm.delete = openDeleteUserDialog;
        vm.edit = openEditUserDialog;
        vm.create = openCreateNewUserDialog;
        init();

        function init() {
             vm.getAll();
        }

        function getAll () {
          var promise = UsersResourcesService.getAll();
        	promise.then(onSuccess, onFailure);
        	function onSuccess (users) {
                vm.allUsers = users;
          }
        	function onFailure (error) {
        		toaster.error({
        			title: 'Error',
	                body: 'Failed to get all users due to error: ' + error.message,
	            });
            }
        }//End getAll

        function openCreateNewUserDialog () {
          var objResolver =  {};
          var strTemplateUrl =  '/app/pages/users/create-user/create.user.view.html';
          var strController =  "UserCreateCtrl as vm";
          var objSuccess = {title: "Create user successfully", body:"user"};
          WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
        }

        function openEditUserDialog (sUser) {
          var objResolver =  {user :  sUser};
          var strTemplateUrl = '/app/pages/users/edit-user/edit.user.view.html';
          var strController = "UserEditCtrl as vm";
          var objSuccess = {title: "Edit user successfully", body:"user"+sUser.id};
          WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
        }

        function openDeleteUserDialog (sUser) {
            var objResolver =  {user :  sUser};
            var strTemplateUrl = '/app/pages/users/delete-user/delete.user.view.html';
            var strController = "UserDeleteCtrl as vm";
            var objSuccess = {title: "Delete user successfully", body:"user"+sUser.id};
            WikiDialog.runUiModal(strTemplateUrl, strController, objResolver, objSuccess);
        }
    }
})();
