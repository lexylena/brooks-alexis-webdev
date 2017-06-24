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
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin,
            
            login: login,
            logout: logout,
            register: register,
            unregister: unregister,
            updateUser: updateUser,
            resetTmp: resetTmp,
            addFriend: addFriend,
            removeFriend: removeFriend,
            followArtist: followArtist,
            unfollowArtist: unfollowArtist,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserList: findUserList,
            searchUsers: searchUsers,

            // admin stuff
            createUser: createUser,
            findAllUsers: findAllUsers,
            deleteUser: deleteUser
        };


        function isLoggedIn() {
            return $http.get('/api/project/isLoggedIn')
                .then(function (response) {
                    return response.data; // either user object or 0
                })
        }

        function isAdmin() {
            return $http.get('/api/project/isAdmin')
                .then(function (response) {
                    return response.data;
                })
        }




        function login(username, password) {
            return $http.post('/api/project/login', {username: username, password: password})
                .then(function (response) {
                    return response.data;
                })
        }

        function logout() {
            $http.post('/api/project/logout')
                .then(function (response) {
                    return response.data;
                })
        }

        function register(user) {
            console.log('registering');
            console.log(user);
            return $http.post('/api/project/register', user)
                .then(function (response) {
                    return response.data;
                })
        }

        function unregister() {
            return $http.delete('/api/project/unregister')
                .then(function (response) {
                    return response.data;
                })
        }

        function updateUser(uid, user) {
            var url = baseUrl + '/' + uid;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function resetTmp() {
            var url = baseUrl + '/resetTmp';
            return $http.post(url, {})
                .then(function (response) {
                    return response.data;
                })
        }

        function addFriend(friendId) {
            var url = baseUrl + '/addFriend';
            return $http.post(url, {friend: friendId})
                .then(function (response) {
                    return response.data;
                })
        }

        function removeFriend(friendId) {
            var url = baseUrl + '/removeFriend?friendId=' + friendId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function followArtist(artistId) {
            var url = baseUrl + '/followArtist';
            return $http.post(url, {artist: artistId})
                .then(function (response) {
                    return response.data;
                })
        }

        function unfollowArtist(artistId) {
            var url = baseUrl + '/unfollowArtist?artistId=' + artistId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserById(uid) {
            var url = baseUrl + '/' +  uid;
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

        function findUserList(uid, listType) {
            var url = baseUrl + '/' + uid + '/' + listType;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function searchUsers(keyword) {
            var url = baseUrl + '?keyword=' + keyword;
            return $http.get(url)
                .then(function (response) {
                    return response.data; // list of users
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

        function deleteUser(uid) {
            var url = baseUrl + '/' + uid;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();