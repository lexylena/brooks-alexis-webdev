/**
 * Created by alexisbrooks on 6/13/17.
 */
(function() {
    angular
        .module('project')
        .factory('artworkService', artworkService);

    function artworkService($http) {

        var baseUrl = '/api/project/artwork';
        var hamApiUrl = 'http://api.harvardartmuseums.org'; //process.env.HAM_API_URL;
        var key = '24befe50-4acc-11e7-8fe0-e55a894aeb34'; //process.env.HAM_API_KEY;
        var keyParam = 'apikey=' + key;

        return {
            createArtwork: createArtwork,
            findArtworkById: findArtworkById,
            findArtworksByArtist: findArtworksByArtist,
            findArtworksByHamArtist: findArtworksByHamArtist,
            updateArtwork: updateArtwork,
            // addArtworkImage: addArtworkImage,
            searchArtwork: searchArtwork,
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
                    if (!response) { // just in case ?
                        return findArtworkByHamId(artworkId);
                    } else {
                        return response.data;
                    }
                })
        }

        function findArtworkByHamId(artworkId) {
            var url = hamApiUrl + '/object/' + artworkId + '?' + keyParam;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findArtworksByArtist(artistId) {
            var url = baseUrl + '?artist-id=' + artistId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findArtworksByHamArtist(hamArtistId) { // for artist objects from HAM api, not actual artist users
            var url = hamApiUrl + '/object?person=' + hamArtistId + '&' + keyParam;
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


        //TODO: search should include project DB too
        function searchArtwork(keyword) {
            // var url = baseUrl + '?keyword=' + keyword;
            // return $http.get(url)
            //     .then(function (response) {
            //         var results = response.data;
                    var hamUrl = hamApiUrl + '/object?keyword=' + keyword + '&' + keyParam;
                    return $http.get(hamUrl)
                        .then(function (hamResponse) {
                            return hamResponse.data; // info, records
                        })
                // })
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