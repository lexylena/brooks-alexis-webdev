/**
 * Created by alexisbrooks on 5/22/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userService) {

        var vm = this;
        vm.user = currentUser;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;


        function unregister() {
            userService
                .unregister()
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateUser(password, password2) {
            if (password !== password2) {
                vm.error = "Passwords must match";
                return;
            }

            var email = vm.user['email'];
            if (email === null || email === undefined || email === "") {
                vm.error = "Must enter valid email";
                return;
            }

            vm.user['password'] = password;

            userService
                .updateUser(vm.user._id, vm.user)
                .then(function () {
                    vm.message = "User updated successfully";
                });
        }

        function logout() {
            userService.logout();
            $location.url('/');
        }
    }
})();