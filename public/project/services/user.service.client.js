/**
 * Created by alexisbrooks on 6/13/17.
 */
(function() {
    angular
        .module('project')
        .factory('userService', userService);

    function userService($http) {

        var baseUrl = '/api/project/user';

        return {
            login: login,
            checkLoggedIn: checkLoggedIn,
            logout: logout,
            registerUser: registerUser,
            updateUserSettings: updateUserSettings,
            unregister: unregister,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            searchUser: searchUser
        };

        function login(username, password) {
            return $http.post('/api/project/login', {username: username, password: password})
                .then(function (response) {
                    return response.data;
                })
        }

        function checkLoggedIn() {
            return $http.get('/api/project/checkLoggedIn')
                .then(function (response) {
                    return response.data; // either user object or 0
                })
        }

        function logout() {
            $http.post('/api/project/logout')
                .then(function (response) {
                    return response.data;
                })
        }

        function registerUser(user) {
            return $http.post('/api/project/register', user)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateUserSettings(user) {
            // make sure can't update everything admin can by using different url?
            return $http.put(baseUrl, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function unregister() {
            return $http.delete(baseUrl)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserById(userId) {
            var url = baseUrl + '/' +  userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserByUsername(username) {
            var url = baseUrl + '?username=' + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function searchUser(keyword) {
            var url = baseUrl + '?keyword=' + keyword;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();