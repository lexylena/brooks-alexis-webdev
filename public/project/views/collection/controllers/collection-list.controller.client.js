/**
 * Created by alexisbrooks on 6/21/17.
 */
(function () {
    angular
        .module('project')
        .controller('collectionListController', collectionListController);

    function collectionListController($routeParams, userService, collectionService) {
        var vm = this;
        vm.curatorId = $routeParams['curatorId'];

        function init() {
            userService.findUserById(vm.curatorId)
                .then(function (user) {
                    vm.curator = user;
                });

            collectionService.findCollectionsForUser(vm.curatorId)
                .then(function (collections) {
                    vm.collections = collections;
                });
        }
        init();
    }

})();