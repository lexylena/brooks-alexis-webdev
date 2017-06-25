/**
 * Created by alexisbrooks on 6/21/17.
 */
(function() {
    angular
        .module('project')
        .controller('artworkDetailsController', artworkDetailsController);

    function artworkDetailsController($routeParams, $location, currentUser, artworkService,
                                      harvardArtMuseumService, selectionService, collectionService) {
        var vm = this;
        vm.user = currentUser;
        vm.artistId = $routeParams['artistId'];
        vm.artworkId = $routeParams['artworkId'];
        vm.isCurator = false;

        vm.changeCurrentImage = changeCurrentImage;

        // for new selection modal
        vm.createSelection = createSelection;

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

            if (vm.user._id && vm.user.roles.indexOf('CURATOR') > -1) {
                vm.isCurator = true;
            }

            collectionService.findCollectionsForUser(vm.user._id)
                .then(function (collections) {
                    vm.collectionOptions = collections;
                });
        }
        init();

        function changeCurrentImage(image) {
            vm.currentImage = image;
        }

        function createSelection(form) {
            if (form.$invalid) {
                return;
            }

            var selection = {
                _collection: form.collection,
                description: form.description,
                meta: {
                    title: vm.artwork.title,
                    artistName: vm.artwork.meta.artistName,
                    primaryImageUrl: vm.artwork.primaryImageUrl
                }
            };

            if (form.defaultDescription) {
                selection.defaultDescription = form.defaultDescription;
            }

            if (vm.hamArt) {
                selection.hamArtworkId = vm.artworkId;
            } else {
                selection._artwork = vm.artworkId;
            }

            selectionService.createSelection(selection)
                .then(function (selection) {
                    vm.message = 'Saved to collection';
                    $("#newSelection").modal('hide');
                }, function (err) {
                    vm.error = 'Error: ' + err.data;
                });
        }
    }
})();