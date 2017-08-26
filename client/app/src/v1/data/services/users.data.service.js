(function () {
    'use strict';

    angular
        .module('wikiApp')
        .factory('UsersDataService', UsersDataService);

    UsersDataService.$inject = ['$q'];
    function UsersDataService($q) {
        var service = {};
        service.getAll = getAll;
        service.getById = getById;
        service.create = createUser;
        service.update = updateUser;
        service.delete = deleteUser;
        return service;

        //public methods
        function getAll () {
            var user1 = {"id" : 1, "name": "admin", "role" : "admin"};
            var user2 = {"id" : 1, "name": "user1", "role" : "user"};
            var userAdmin = {"id" : 2, "name": "user2", "role" : "user"};
            var results = [user1, user2, userAdmin];
            return $q.when(results);
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
