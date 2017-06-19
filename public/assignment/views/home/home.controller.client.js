/**
 * Created by alexisbrooks on 6/18/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('homeController', homeController);

    function homeController($route, currentUser, userService) {

        var vm = this;
        vm.user = currentUser;
        vm.logout = function () {
            userService.logout();
            $route.reload();
        }
    }
})();