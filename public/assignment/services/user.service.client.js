(function () {
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService($http) {

        var baseUrl = '/api/assignment/user';

        return {
            checkLoggedIn: checkLoggedIn,
            login: login,
            logout: logout,
            register: register,
            unregister: unregister,
            updateUser: updateUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,

            // admin stuff
            createUser: createUser,
            findAllUsers: findAllUsers,
            deleteUser: deleteUser
        };


        function checkLoggedIn() {
            return $http.get('/api/assignment/checkLoggedIn')
                .then(function (response) {
                    return response.data; // either user object or 0
                })
        }

        function login(username, password) {
            return $http.post('/api/assignment/login', {username: username, password: password})
                .then(function (response) {
                    return response.data;
                })
        }

        function logout() {
            $http.post('/api/assignment/logout')
                .then(function (response) {
                    return response.data;
                })
        }

        function register(user) {
            return $http.post('/api/assignment/register', user)
                .then(function (response) {
                    return response.data;
                })
        }

        function unregister() {
            return $http.delete('/api/assignment/unregister')
                .then(function (response) {
                    return response.data;
                })
        }

        function updateUser(userId, user) {
            var url = baseUrl + '/' + userId;
            return $http.put(url, user)
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




        // admin stuff
        function createUser(user) {
            return $http.post(baseUrl, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function findAllUsers() {
            return $http.get(baseUrl)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteUser(userId) {
            var url = baseUrl + '/' + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();