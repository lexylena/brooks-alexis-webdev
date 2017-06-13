(function () {
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService($http) {

        var rootUrl = '/api/assignment/user';

        return {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function createUser(user) {
            return $http.post(rootUrl, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserByUsername(username) {
            var url = rootUrl + '?username=' + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateUser(userId, user) {
            var url = rootUrl + '/' + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteUser(userId) {
            var url = rootUrl + '/' + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserByCredentials(username, password) {
            var url = rootUrl + "?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserById(userId) {
            var url = rootUrl + '/' +  userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();