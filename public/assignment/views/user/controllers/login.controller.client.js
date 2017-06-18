/**
 * Created by alexisbrooks on 5/22/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var vm = this;

        vm.login = function (form) {
            if (form.$invalid) {
                vm.message = null;
                return;
            }

            userService
                .login(form.username, form.password)
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