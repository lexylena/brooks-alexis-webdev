/**
 * Created by alexisbrooks on 6/26/17.
 */
(function () {
    angular
        .module('project')
        .controller('adminEditController', adminEditController);

    function adminEditController($location, $routeParams, userService) {
        var vm = this;
        vm.userId = $routeParams['userId'];

        vm.updateUser = updateUser;

        function init() {
            userService.findUserById(vm.userId)
                .then(function (user) {
                    vm.user = user;
                });
        }
        init();

        function updateUser() {
            userService.updateUser(vm.userId, vm.user)
                .then(function (status) {
                    $location.url('/admin');
                });
        }
    }
})();