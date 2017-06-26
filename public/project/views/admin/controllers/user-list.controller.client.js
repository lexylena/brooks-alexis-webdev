/**
 * Created by alexisbrooks on 6/26/17.
 */
(function () {
    angular
        .module('project')
        .controller('adminListController', adminListController);

    function adminListController($location, userService) {
        var vm = this;
        vm.deleteUser = deleteUser;

        function init() {
            userService.findAllUsers()
                .then(function (users) {
                    vm.users = users;
                });
        }
        init();

        function deleteUser(user) {
            userService.deleteUser(user._id)
                .then(function (status) {
                    $location.url('/admin');
                });
        }
    }
})();