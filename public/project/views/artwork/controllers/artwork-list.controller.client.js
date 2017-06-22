/**
 * Created by alexisbrooks on 6/21/17.
 */
(function () {
    angular
        .module('project')
        .controller('artworkListController', artworkListController);

    function artworkListController($routeParams, artworkService, harvardArtMuseumService, userService) {
        var vm = this;
        vm.artistId = $routeParams['artistId'];
        vm.getArtworksPage = getArtworksPage;

        function init() {
            vm.artistRouteId = vm.artistId;
            if (vm.artistId.substring(0, 4) === 'HAM_') {
                vm.artistRouteId = vm.artistId.substring(4);

                harvardArtMuseumService.findArtworksByArtistId(vm.artistRouteId)
                    .then(function (artworks) {
                        vm.artworks = artworks.records;
                        vm.pages = [];
                        for (var ii = 1; ii < artworks.info.pages + 1; ii++) {
                            vm.pages.push(ii);
                        }
                        vm.currentPage = 1;
                    });

                harvardArtMuseumService.findArtistById(vm.artistRouteId)
                    .then(function (artist) {
                        vm.artist = artist;

                    });

            } else {
                artworkService.findArtworksByArtistId(vm.artistId)
                    .then(function (artworks) {
                        vm.artworks = artworks;
                    });

                userService.findUserById(vm.artistId)
                    .then(function (user) {
                        vm.artist = user;
                    });
            }
        }
        init();

        function getArtworksPage(page) {
            harvardArtMuseumService.findArtworksByArtistId(vm.artistRouteId, page)
                .then(function (artworks) {
                    vm.artworks = artworks.records;
                    vm.currentPage = page;
                });
        }
    }

})();