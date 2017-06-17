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

        function register(form) {
            if (form.$invalid === true) {
                return;
            }
            if (!form.password || form.password !== form.password2) {
                vm.error = "Passwords must match";
                return;
            }

            return userService.findUserByUsername(form.username)
                .then(usernameFound, usernameAvailable);

            function usernameFound(user) {
                vm.error = "Username is not available";
            }

            function usernameAvailable() {
                var user = {
                    username: form.username,
                    password: form.password,
                    email: form.email
                };

                userService.register(user)
                    .then(function (user) {
                        $location.url('/profile');
                    })
            }
        }
    }
})();