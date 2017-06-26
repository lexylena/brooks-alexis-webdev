/**
 * Created by alexisbrooks on 6/26/17.
 */
(function () {
    angular
        .module('project')
        .controller('adminCreateController', adminCreateController);

    function adminCreateController($location, userService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(form) {
            var user = {
                username: form.username,
                password: form.password,
                email: form.email,
                firstName: form.firstName,
                lastName: form.lastName,
                displayName: form.displayName,
                roles: form.roles
            };
            userService.createUser(user)
                .then(function (user) {
                    $location.url('/admin');
                });
        }
    }
})();