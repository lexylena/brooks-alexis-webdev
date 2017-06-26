/**
 * Created by alexisbrooks on 6/24/17.
 */
(function () {
    angular
        .module('project')
        .controller('collectionEditController', collectionEditController);

    function collectionEditController($location, $routeParams, currentUser, userService, collectionService) {
        var vm = this;
        vm.user = currentUser;
        vm.collectionId = $routeParams['collectionId'];

        vm.saveCollection = saveCollection;
        vm.deleteCollection = deleteCollection;

        function init() {
            collectionService.findCollectionById(vm.collectionId)
                .then(function (collection) {
                    vm.coll = collection;
                });

            userService.findUserList(vm.user._id, 'friends')
                .then(function (friends) {
                    vm.friends = friends;
                });
        }
        init();

        function saveCollection() {
            collectionService.updateCollection(vm.collectionId, vm.coll)
                .then(function (status) {
                    $location.url('/curator/' + vm.user._id + '/collection/' + vm.collectionId + '/selection');
                });
        }

        function deleteCollection() {
            collectionService.deleteCollection(vm.collectionId)
                .then(function (status) {
                    $location.url('/curator/' + vm.user._id + '/collection/');
                });
        }
    }
})();