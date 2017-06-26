/**
 * Created by alexisbrooks on 6/21/17.
 */
(function () {
    angular
        .module('project')
        .controller('artworkNewController', artworkNewController);

    function artworkNewController($location, currentUser, artworkService, harvardArtMuseumService, userService) {
        var vm = this;
        vm.user = currentUser;

        vm.updateTmp = updateTmp;
        vm.createArtwork = createArtwork;
        vm.cancelCreate = cancelCreate;

        function init() {
            artworkService.findArtworksByArtistId(vm.user._id)
                .then(function (artworks) {
                    vm.artworks = artworks;
                });
            harvardArtMuseumService.getClassificationOptions()
                .then(function (options) {
                    vm.classificationOptions = options;
                });
            vm.tmp = vm.user.tmp;
        }
        init();

        function updateTmp() {
            userService.findUserById(vm.user._id)
                .then(function (user) {
                    vm.tmp = user.tmp;
                });
        }

        function createArtwork(form) {
            if (form.$invalid) {
                return;
            }

            if (!vm.tmp || vm.tmp === []) {
                vm.error = "At least one image is required";
                return;
            }




            var artwork = {
                title: form.title,
                description: form.description,
                date: form.date,
                classification: form.classification,
                medium: form.medium,
                technique: form.technique,
                style: form.style,
                tags: form.tags.replace(/ /g, '').split('#'),
                relatedWorks: form.relatedWorks,
                images: vm.tmp
            };

            if (form.classification === 'Other') {
                artwork.classification = 'Other: ' + form.otherClassification;
            }

            artworkService.createArtwork(artwork)
                .then(function (artwork) {
                    userService.resetTmp()
                        .then(function() {
                            $location.url('/artist/' + vm.user._id + '/artwork/' + artwork._id);
                        })
                });
        }

        function cancelCreate() {
            userService.resetTmp()
                .then(function () {
                    $location.url('/artist/' + vm.user._id);
                });
        }
    }

})();