/**
 * Created by alexisbrooks on 6/13/17.
 */
(function () {
    angular
        .module('project')
        .controller('curatorProfileController', curatorProfileController);
    
    function curatorProfileController($routeParams, currentUser, userService, collectionService) {
        var vm = this;
        vm.user = currentUser;
        vm.curatorId = $routeParams['curatorId'];
        vm.isFriend = false;

        vm.addFriend = addFriend;
        vm.unfriend = unfriend;

        function init() {
            userService.findUserById(vm.curatorId)
                .then(function (user) {
                    vm.curator = user;
                })
                .then(function () {
                    userService.findUserList(vm.curatorId, 'friends')
                        .then(function (friends) {
                            vm.friends = friends;
                        });
                })
                .then(function () {
                    userService.findUserList(vm.curatorId, 'followedArtists')
                        .then(function (artists) {
                            vm.followedArtists = artists;
                        });
                });

            collectionService.findCollectionsForUser(vm.curatorId)
                .then(function (collections) {
                    vm.collections = collections;
                });

            if (currentUser._id && currentUser.friends.indexOf(vm.curatorId) > -1) {
                vm.isFriend = true;
            }
        }
        init();


        function addFriend() {
            userService.addFriend(vm.curatorId)
                .then(function (response) {
                    vm.message = "Now friends with " + vm.curator.displayName;
                    vm.isFriend = true;
                }, function (err) {
                    vm.error = "Oops! You must be signed in to add users as friends.";
                });
        }

        function unfriend() {
            userService.unfriend(vm.curatorId)
                .then(function (response) {
                    vm.message = "Unfriended " + vm.curator.displayName;
                    vm.isFriend = false;
                });
        }
    }

})();