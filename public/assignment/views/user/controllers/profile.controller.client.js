/**
 * Created by alexisbrooks on 5/22/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, userService, $routeParams) {

        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;


        userService
            .findUserById(vm.uid)
            .then(renderUser);

        function renderUser (user) {
            vm.user = user;
        }

        function deleteUser() {
            userService
                .deleteUser(vm.uid)
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
                .updateUser(vm.uid, vm.user)
                .then(function () {
                    vm.message = "User updated successfully";
                });
        }
    }
})();