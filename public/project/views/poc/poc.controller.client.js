/**
 * Created by alexisbrooks on 6/4/17.
 */
(function() {
    angular
        .module('project')
        .controller('pocController', pocController);

    function pocController($location, pocService) {
        var vm = this;

        vm.search = search;
        vm.getArtworkDetails = getArtworkDetails;

        function getBio(artist) {
            return pocService.getBio(artist)
                .then(function (response) {
                    artist.wikiUrl = response.data['query']['pages'][artist.wikipedia_id]['canonicalurl'];
                })
        }

        function search(searchText) {
            return pocService.searchWorks(searchText)
                .then(function (response) {
                    vm.results = response.data.records;
                    console.log(response.data);
                })
        }

        function getArtworkDetails(artwork) {
            return pocService.getArtwork(artwork.id)
                .then(function (response) {
                    vm.details = response.data;
                })
        }


    }

})();