/**
 * Created by alexisbrooks on 5/22/17.
 */
(function() {
    angular
        .module('project')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var vm = this;

        vm.register = register;

        function register(user, password2) {
            if (user.username === undefined) {
                vm.error = "Please enter a username";
                return;
            }

            if (!user.password || user.password !== password2) {
                vm.error = "Passwords must match";
                return;
            }

            return userService.findUserByUsername(user.username)
                .then(usernameFound, usernameAvailable);

            function usernameFound(user) {
                vm.error = "Username is not available";
            }

            function usernameAvailable() {
                if (!user.email) {
                    vm.error = "Must enter valid email";
                    return;
                }

                // var user = {
                //     username: username,
                //     password: password,
                //     email: email
                // };

                userService.createUser(user)
                    .then(function (newUser) {
                        $location.url('/user/' + newUser._id + '/settings');
                    });
            }
        }
    }
})();