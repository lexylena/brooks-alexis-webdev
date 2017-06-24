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
                    vm.profile = user;
                });

            userService.findUserList(vm.profileId, vm.userListType)
                .then(function (users) {
                    vm.userList = users;

                    vm.allUsersOfType = 'curator';
                    vm.typeTitle = 'Friends';
                    if (vm.userListType === 'followedArtists') {
                        vm.allUsersOfType = 'artist';
                        vm.typeTitle = 'Followed Artists';
                    }
                });
        }
        init();

    }

})();