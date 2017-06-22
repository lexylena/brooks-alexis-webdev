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

        // vm.followArtist = followArtist;


        function init() {
            userService.findUserById(vm.artistId)
                .then(function (user) {
                    vm.artist = user;
                });

            artworkService.findArtworksByArtistId(vm.artistId)
                .then(function (artworks) {
                    vm.portfolio = artworks;
                });
        }
        init();
    }

})();