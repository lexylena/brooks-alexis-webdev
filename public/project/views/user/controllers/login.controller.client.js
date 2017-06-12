/**
 * Created by alexisbrooks on 5/22/17.
 */
(function () {
    angular
        .module('project')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var vm = this;

        vm.login = function (username, password) {

            userService
                .findUserByCredentials(username, password)
                .then(login, handleError);

            function handleError(error) {
                vm.message = "Username " + username + " not found, please try again";
            }

            function login(found) {
                if (found !== null) {
                    $location.url('/user/' + found._id + '/profile/' + found._id);
                } else {
                    vm.message = "Username and password combination not found. Please try again.";
                }
            }
        };
    }
})();