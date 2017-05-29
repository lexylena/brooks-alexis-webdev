(function () {
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService() {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" },
            {_id: "567", username: "test",     password: "test",     firstName: "test",   lastName: "test"    }
        ];

        return {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        // creates new user and returns new user's ID
        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
            return user._id;
        }

        function findUserByUsername(username) {
            return users.find(function (user) {
                return user.username === username
            });
        }

        function updateUser(userId, user) {
            var update = users.find(function (user) {
                return user._id === userId;
            });

            Object.keys(update).forEach(function (key) {
                update[key] = user[key];
            });
        }

        function deleteUser(userId) {
            var user = users.find(function (user) {
                return user._id === userId;
            });
            var index = users.indexOf(user);
            users.splice(index, 1);
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if(user.username === username && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function findUserById(userId) {
            return users.find(function (user) {
                return user._id === userId;
            });
        }
    }
})();