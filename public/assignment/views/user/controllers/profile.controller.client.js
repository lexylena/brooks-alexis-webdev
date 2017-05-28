/**
 * Created by alexisbrooks on 5/22/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, userService, $routeParams) {

        var vm = this;
        var userId = $routeParams['uid'];

        vm.user = userService.findUserById(userId);
        vm.updateUser = updateUser;

        function updateUser(password, password2) {
            if (password !== password2) {
                vm.error = "Passwords must match";
                return;
            }

            var email = vm.user.email;
            if (email === null || email === undefined || email === "") {
                vm.error = "Must enter valid email";
                return;
            }

            vm.user['password'] = password;
            userService.updateUser(userId, vm.user);
            vm.error = null;
        }
    }
})();