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

            var found = userService.findUserByCredentials(username, password);

            if(found !== null) {
                $location.url('/user/' + found._id);
            } else {
                vm.message = "Username and password combination not found. Please try again.";
            }
        };
    }
})();