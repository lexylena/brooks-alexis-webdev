/**
 * Created by alexisbrooks on 6/21/17.
 */
(function() {
    angular
        .module('project')
        .controller('artworkDetailsController', artworkDetailsController);

    function artworkDetailsController($routeParams, currentUser,
                                      artworkService, harvardArtMuseumService) {
        var vm = this;
        vm.user = currentUser;
        vm.artistId = $routeParams['artistId'];
        vm.artworkId = $routeParams['artworkId'];
        vm.changeCurrentImage = changeCurrentImage;

        function init() {
            var service = artworkService;
            var artworkId = vm.artworkId;
            var artistId = vm.artistId;
            if (vm.artistId.substring(0, 4) === 'HAM_') {
                vm.hamArt = true;
                service = harvardArtMuseumService;
                artistId = vm.artistId.substring(4);
                artworkId = vm.artworkId.substring(4);
            }

            service.findArtworkById(artworkId)
                .then(function (artwork) {
                    vm.artwork = artwork;
                    vm.currentImage = artwork.primaryImageUrl;
                });

            service.findRelatedWorks(artworkId)
                .then(function (related) {
                    if (related.records.length > 0) {
                        vm.relatedWorks = related.records;
                    }
                });
        }
        init();

        function changeCurrentImage(image) {
            vm.currentImage = image;
        }
    }
})();