/**
 * Created by alexisbrooks on 6/4/17.
 */
(function () {
    angular
        .module('project')
        .factory('pocService', pocService);

    function pocService($http) {

        // var key = '3fe08c39732dab1136e68ac5999f199ae255621e13aac0f6abaabadc29f5515a';

        var apiKey = 'apikey=24befe50-4acc-11e7-8fe0-e55a894aeb34';
        var baseUrl = 'http://api.harvardartmuseums.org';


        // var artsyClientId = '47436c9111eaca12fae2';
        // var artsyClientSecret = 'ef96975704ebc4ad5d0928141c31dbfe';
        // var artsyApiUrl = 'https://api.artsy.net/api/tokens/xapp_token';
        // var xAppToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTQ5NzMxMjc1NywiaWF0IjoxNDk2NzA3OTU3LCJhdWQiOiI1OTM1ZjM3NWIyMDJhMzNjZDBjNGU3Y2UiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNTkzNWYzNzU5YzE4ZGI0YWI0ZmVkOGUzIn0.tiOYRumvzfmEw_tGseg6-aCYfAMKNuOvmKTbCPvimsA";

        // function init() {
        //     $http.post(artsyApiUrl, { client_id: artsyClientId, client_secret: artsyClientSecret })
        //         .then(function (res) {
        //             console.log(res.data);
        //             xAppToken = res.data.token;
        //             // console.log(xAppToken);
        //         })
        // }

        // init();


        // var baseUrl = 'https://api.art.rmngp.fr/v1/';
        // var artsyBaseUrl = 'https://api.artsy.net/api';

        // $http.defaults.headers.common['ApiKey'] = key;

        return {
            searchWorks: searchWorks,
            getArtwork: getArtwork,
            getArtist: getArtist,
            getBio: getBio

        };

        function searchWorks(searchText) {
            var url = baseUrl + '/object?keyword=' + searchText + '&' + apiKey;
            return $http.get(url);
        }

        function getArtwork(artworkId) {
            var url = baseUrl + '/object/' + artworkId + '?' + apiKey;
            return $http.get(url);
        }

        function getArtist(artistId) {
            var url = baseUrl + '/person/' + artistId + '?' + apiKey;
            return $http.get(url);
        }

        function getBio(artist) {
            var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&pageids='
                + artist.wikipedia_id;
            return $http.get(wikiUrl);
        }
    }
})();