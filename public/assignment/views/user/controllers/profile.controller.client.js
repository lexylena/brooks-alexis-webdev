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

        function updateUser(form) {
            if (form.$invalid) {
                vm.message = null;
                return;
            }

            if (form.password !== form.password2) {
                console.log(form.password);
                console.log(form.password2);
                vm.error = "Passwords must match";
                return;
            }

            var user = {
                email: vm.user.email,
                password: form.password,
                firstName: vm.user.firstName,
                lastName: vm.user.lastName
            };

            userService
                .updateUser(vm.user._id, user)
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