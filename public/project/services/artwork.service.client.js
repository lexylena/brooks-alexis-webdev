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
            findRelatedWorks: findRelatedWorks,
            updateArtwork: updateArtwork,
            searchArtwork: searchArtwork,
            filterSearch: filterSearch,
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
            var url = baseUrl + '?artistId=' + artistId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findRelatedWorks(artworkId) {
            var url = baseUrl + '/' + artworkId + '/findRelatedWorks';
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

        function filterSearch(filter) {

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