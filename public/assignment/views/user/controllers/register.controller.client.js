/**
 * Created by alexisbrooks on 5/22/17.
 */
(function() {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) { // loginController treated like constructor, so has this as a reference to it
        // tie instance of controller to namespace stuff instead of using $scope

        var model = this;

        model.register = register;

        function register(username, password, password2, email) {
            if (password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            var found = userService.findUserByUsername(username);

            if (found !== undefined) {
                model.error = "Username is not available";
                return;
            }

            if (email === null || email === undefined || email === "") {
                model.error = "Must enter valid email";
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