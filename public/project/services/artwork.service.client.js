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
            findArtworksByArtistId: findArtworksByArtistId,
            updateArtwork: updateArtwork,
            // addArtworkImage: addArtworkImage,
            searchArtwork: searchArtwork,
            // filterSearch: filterSearch,
            deleteArtwork: deleteArtwork
        };

        function createArtwork(artwork) {
            return $http.post(baseUrl, artwork)
                .then(function (response) {
                    return response.data;
                })
        }

        function findArtworkById(artworkId) {
            var url = baseUrl + '/' + artworkId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findArtworksByArtistId(artistId) {
            var url = baseUrl + '?artist-id=' + artistId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateArtwork(artworkId, artwork) {
            var url = baseUrl + '/' + artworkId;
            return $http.put(url, artwork)
                .then(function (response) {
                    return response.data;
                })
        }

        function searchArtwork(keyword) {
            var url = baseUrl + '?keyword=' + keyword;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
            }

        function deleteArtwork(artworkId) {
            var url = baseUrl + '/' + artworkId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();