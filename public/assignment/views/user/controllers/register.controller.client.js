/**
 * Created by alexisbrooks on 5/22/17.
 */
(function() {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var vm = this;

        vm.register = register;

        function register(username, password, password2, email) {
            if (username === undefined) {
                vm.error = "Please enter a username";
                return;
            }

            if (!password || password !== password2) {
                vm.error = "Passwords must match";
                return;
            }

            return userService.findUserByUsername(username)
                .then(usernameFound, usernameAvailable);

            function usernameFound(user) {
                vm.error = "Username is not available";
            }

            function usernameAvailable() {
                if (!email) {
                    vm.error = "Must enter valid email";
                    return;
                }

                var user = {
                    username: username,
                    password: password,
                    email: email
                };

                userService.register(user)
                    .then(function (user) {
                        $location.url('/profile');
                    })
            }
        }
    }
})();