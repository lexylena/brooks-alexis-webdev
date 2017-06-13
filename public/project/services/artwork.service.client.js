/**
 * Created by alexisbrooks on 6/13/17.
 */
(function() {
    angular
        .module('project')
        .factory('artworkService', artworkService);

    function artworkService($http) {

        var baseUrl = '/api/project/artwork';

        return {
            createArtwork: createArtwork,
            findArtworkById: findArtworkById,
            findArtworksByArtist: findArtworksByArtist,
            updateArtwork: updateArtwork,
            // likeArtwork: likeArtwork,
            searchArtwork: searchArtwork,
            deleteArtwork: deleteArtwork
        };

        function createArtwork(artistId, artwork) {

        }

        function findArtworkById(artworkId) {

        }

        function findArtworksByArtist(artistId) { // for artist objects from HAM api, not actual artist users

        }

        function updateArtwork(artworkId, artwork) {

        }

        function searchArtwork(keyword) {

        }

        function deleteArtwork(artworkId) {

        }
    }
})();