/**
 * Created by alexisbrooks on 6/24/17.
 */
(function () {
    angular
        .module('project')
        .controller('collectionNewController', collectionNewController);

    function collectionNewController($location, currentUser, userService, collectionService) {
        var vm = this;
        vm.user = currentUser;

        vm.createCollection = createCollection;

        function init() {
            userService.findUserList(vm.user._id, 'friends')
                .then(function (friends) {
                    vm.friends = friends;
                });
        }
        init();

        function createCollection(form) {
            if (form.$invalid) {
                return;
            }

            var collection = {
                name: form.name,
                description: form.description,
                curators: form.curators
            };

            collectionService.createCollection(collection)
                .then(function (collection) {
                    $location.url('/curator/' + vm.user._id + '/collection/' + collection._id + '/selection');
                });
        }
    }
})();