/**
 * Created by alexisbrooks on 6/21/17.
 */
(function () {
    angular
        .module('project')
        .controller('selectionListController', selectionListController);

    function selectionListController($routeParams, $location, currentUser,
                                     collectionService, selectionService, artworkService) {
        var vm = this;
        vm.user = currentUser;
        vm.curatorId = $routeParams['curatorId'];
        vm.collectionId = $routeParams['collectionId'];

        function init() {
            collectionService.findCollectionById(vm.collectionId)
                .then(function (collection) {
                    vm.coll = collection;
                });

            selectionService.findSelectionsForCollection(vm.collectionId)
                .then(function (selections) {
                    vm.selections = selections;
                });
        }
        init();
    }

})();