/**
 * Created by alexisbrooks on 6/21/17.
 */
(function () {
    angular
        .module('project')
        .controller('artistProfileController', artistProfileController);

    function artistProfileController(currentUser, $routeParams, artworkService, userService) {
        var vm = this;
        vm.user = currentUser;
        vm.artistId = $routeParams['artistId'];

        vm.followArtist = followArtist;
        vm.unfollowArtist = unfollowArtist;


        function init() {
            if (vm.artistId.substring(0, 4) === 'HAM_') {
                vm.hamArtist = true;
            } else {
                userService.findUserById(vm.artistId)
                    .then(function (user) {
                        vm.artist = user;
                    });

                userService.findUserList(vm.artistId, 'followers')
                    .then(function (followers) {
                        vm.followers = followers;
                    });

                artworkService.findArtworksByArtistId(vm.artistId)
                    .then(function (artworks) {
                        vm.portfolio = artworks;
                    });

                if (currentUser._id && currentUser.followedArtists.indexOf(vm.artistId) > -1) {
                    vm.isFollowing = true;
                }
            }
        }
        init();

        function followArtist() {
            userService.followArtist(vm.artistId)
                .then(
                    function (response) {
                        vm.message = "Now following" + vm.artist.displayName;
                        vm.isFollowing = true;

                        userService.findUserList(vm.artistId, 'followers')
                            .then(function (followers) {
                                vm.followers = followers;
                            });
                    },
                    function (err) {
                        vm.error = "Oops! You must sign in to follow artists";
                    });
        }

        function unfollowArtist() {
            userService.unfollowArtist(vm.artistId)
                .then(function (response) {
                    vm.message = "Unfollowed" + vm.artist.displayName;
                    vm.isFollowing = false;

                    userService.findUserList(vm.artistId, 'followers')
                        .then(function (followers) {
                            vm.followers = followers;
                        });
                });
        }
    }

})();