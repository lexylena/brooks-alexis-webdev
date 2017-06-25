/**
 * Created by alexisbrooks on 6/21/17.
 */
(function () {
    angular
        .module('project')
        .controller('selectionListController', selectionListController);

    function selectionListController($routeParams, $location, currentUser,
                                     collectionService, selectionService, userService) {
        var vm = this;
        vm.user = currentUser;
        vm.curatorId = $routeParams['curatorId'];
        vm.collectionId = $routeParams['collectionId'];
        vm.removeCurator = removeCurator;

        function init() {
            collectionService.findCollectionById(vm.collectionId)
                .then(function (collection) {
                    vm.coll = collection;
                });

            collectionService.findCuratorsForCollection(vm.collectionId)
                .then(function (curators) {
                    vm.curators = curators;
                });

            selectionService.findSelectionsForCollection(vm.collectionId)
                .then(function (selections) {
                    vm.selections = selections;
                });
        }

        init();

        function removeCurator() {
            userService.removeCollection(vm.user._id, vm.collectionId)
                .then(function (status) {
                    $location.url('/curator/' + vm.user._id + '/collection');
                });
        }
    }

})();