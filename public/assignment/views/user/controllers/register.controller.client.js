/**
 * Created by alexisbrooks on 5/22/17.
 */
(function() {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) { // loginController treated like constructor, so has this as a reference to it
        // tie instance of controller to namespace stuff instead of using $scope

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

            var found = userService.findUserByUsername(username);

            if (found !== undefined) {
                vm.error = "Username is not available";
                return;
            }

            if (!email) {
                vm.error = "Must enter valid email";
                return;
            }

            var user = {
                username: username,
                password: password,
                email: email
            };
            var newUserId = userService.createUser(user);
            $location.url('/user/' + newUserId);
        }
    }
})();