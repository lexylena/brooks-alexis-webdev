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
            vm.service = userService;
            if (vm.artistId.substring(0, 4) === 'HAM_') {
                vm.service = harvardArtMuseumService;
                vm.artistRouteId = vm.artistId.substring(4);
            }

            vm.service.findArtworksByArtistId(vm.artistRouteId)
                .then(function (artworks) {
                    if (vm.service === harvardArtMuseumService) {
                        vm.artworks = artworks.records;
                        vm.pages = [];
                        for (var ii = 1; ii < artworks.info.pages + 1; ii++) {
                            vm.pages.push(ii);
                        }
                        vm.currentPage = 1;
                    } else {
                        vm.artworks = artworks;
                    }
                });

            vm.service.findArtistById(vm.artistRouteId)
                .then(function (artist) {
                    vm.artist = artist;
                });
        }
        init();

        function getArtworksPage(page) {
            vm.service.findArtworksByArtistId(vm.artistRouteId, page)
                .then(function (artworks) {
                    vm.artworks = artworks.records;
                    vm.currentPage = page;
                });
        }
    }

})();