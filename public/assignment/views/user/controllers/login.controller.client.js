/**
 * Created by alexisbrooks on 5/22/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var vm = this;

        vm.login = function (username, password) {

            userService
                .login(username, password)
                .then(login, handleError);

            function login(found) {
                $location.url('/profile');
            }

            function handleError(error) {
                vm.message = "Username and password combination not found. Please try again.";
            }
        };
    }
})();