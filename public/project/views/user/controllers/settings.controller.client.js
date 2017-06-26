/**
 * Created by alexisbrooks on 6/21/17.
 */
(function () {
    angular
        .module('project')
        .controller('settingsController', settingsController);

    function settingsController($location, currentUser, userService) {
        var vm = this;
        vm.user = currentUser;

        vm.updateSettings = updateSettings;
        vm.unregister = unregister;

        function updateSettings(form) {
            if (form.$invalid) {
                vm.message = null;
                return;
            }

            if (form.password !== form.password2) {
                vm.error = "Passwords must match";
                return;
            }

            var user = {
                email: vm.user.email,
                password: form.password,
                firstName: vm.user.firstName,
                lastName: vm.user.lastName,
                bio: vm.user.bio
            };

            userService
                .updateUser(vm.user._id, user)
                .then(function () {
                    vm.message = "User updated successfully";
                });
        }

        function unregister() {
            userService.unregister()
                .then(function () {
                    $location.url('/');
                });
        }

    }
})();