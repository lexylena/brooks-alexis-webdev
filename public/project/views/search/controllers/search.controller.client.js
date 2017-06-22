/**
 * Created by alexisbrooks on 6/21/17.
 */
(function () {
    angular
        .module('project')
        .controller('searchController', searchController);

    function searchController($routeParams, artworkService, harvardArtMuseumService, userService) {
        var vm = this;
        vm.searchType = $routeParams['searchType'];
        vm.keyword = $routeParams['keyword'];

        vm.getArtworksPage = getArtworksPage;


        function init() {
            if (vm.searchType === 'artwork') {
                artworkService.searchArtwork(vm.keyword)
                    .then(function (artworks) {
                        vm.artworks = artworks;
                        vm.localCount = artworks.length;
                    });

                harvardArtMuseumService.searchArtwork(vm.keyword)
                    .then(function (artworks) {
                        vm.hamArtworks = artworks.records;
                        vm.hamCount = artworks.info.totalrecords;
                        vm.pages = [];
                        for (var ii = 1; ii < artworks.info.pages + 1; ii++) {
                            vm.pages.push(ii);
                        }
                        vm.currentPage = 1;
                    });
            } else {
                userService.searchUsers(vm.keyword)
                    .then(function (users) {
                        vm.userResults = users;
                        vm.localCount = users.length;
                    });
            }
        }
        init();

        function getArtworksPage(page) {
            harvardArtMuseumService.searchArtwork(vm.keyword, page)
                .then(function (artworks) {
                    vm.hamArtworks = artworks.records;
                    vm.currentPage = page;
                });
        }

    }

})();