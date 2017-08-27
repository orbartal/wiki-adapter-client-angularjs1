(function () {
    'use strict';

    angular
        .module('wikiApp')
        .factory('UsersDataService', UsersDataService);

    UsersDataService.$inject = ['$q', 'PageUtils'];
    function UsersDataService($q, PageUtils) {
        var service = {};
        service.getAll = getAll;
        service.getById = getById;
        service.create = createUser;
        service.update = updateUser;
        service.delete = deleteUser;
        return service;

        //public methods
        function getAll (page) {
            var user1 = {"id" : 1, "name": "admin", "role" : "admin"};
            var user2 = {"id" : 2, "name": "user1", "role" : "user"};
            var userAdmin = {"id" : 3, "name": "user2", "role" : "user"};
            var users = [user1, user2, userAdmin];
            var result = PageUtils.arrayToPage(users, page);
            return $q.when(result);
        }

        function getById(id) {
            var result = {"id" : id};
            return $q.when(result);
        }

        function createUser(user) {
            return $q.when(user);
        }

        function updateUser(user) {
              return $q.when(user);
        }

        function deleteUser(user) {
            return $q.when(user);
        }

        //private functions
        function onSuccess(result) {
        	return result;
        }

        function onFailure(error) {
            throw error;
        }
    }

})();
