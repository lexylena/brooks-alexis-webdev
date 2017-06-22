/**
 * Created by alexisbrooks on 6/21/17.
 */
(function () {
    angular
        .module('project')
        .controller('userListController', userListController);

    function userListController($routeParams, userService) {
        var vm = this;
        vm.profileId = $routeParams['curatorId'];
        vm.userListType = $routeParams['userListType'];

        function init() {
            userService.findUserById(vm.profileId)
                .then(function (user) {
                    vm.userList = user[vm.userListType];
                    vm.allUsersOfType = 'curator';
                    if (vm.userListType === 'followed-artists') {
                        vm.allUsersOfType = 'artist';
                    }
                });
        }
        init();

    }

})();