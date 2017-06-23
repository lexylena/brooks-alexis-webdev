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
            userService.findUserById(vm.artistId)
                .then(function (user) {
                    vm.artist = user;
                });

            artworkService.findArtworksByArtistId(vm.artistId)
                .then(function (artworks) {
                    vm.portfolio = artworks;
                });

            if (currentUser._id && currentUser.followedArtists.indexOf(vm.artistId) > -1) {
                vm.isFollowing = true;
            }
        }
        init();

        function followArtist() {
            userService.followArtist(vm.artistId)
                .then(
                    function (response) {
                        vm.message = "Now following" + vm.artist.displayName;
                        vm.isFollowing = true;
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
                });
        }
    }

})();