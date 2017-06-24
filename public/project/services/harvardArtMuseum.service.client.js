/**
 * Created by alexisbrooks on 6/20/17.
 */
(function() {
    angular
        .module('project')
        .factory('harvardArtMuseumService', harvardArtMuseumService);
    
    function harvardArtMuseumService($http) {
        var baseUrl = 'http://api.harvardartmuseums.org'; //process.env.HAM_API_URL;
        var key = '24befe50-4acc-11e7-8fe0-e55a894aeb34'; //process.env.HAM_API_KEY;
        var keyParam = 'apikey=' + key;

        var wikipediaBaseUrl = 'http://en.wikipedia.org/w/api.php?format=json&action=query';

        var artworkKeyConversion = {
            "title": "title",
            "description": "description",
            "dated": "dated",
            "medium": "medium",
            "technique": "technique",
            "style": "style",
            "primaryimageurl": "primaryImageUrl",
            "imagecount": "meta.imageCount",
            "relatedcount": "meta.relatedCount"
        };
        
        return {
            searchArtwork: searchArtwork,
            findArtworkById: findArtworkById,
            findArtistById: findArtistById,
            findArtworksByArtistId: findArtworksByArtistId,
            getClassificationOptions: getClassificationOptions,
            getArtistBio: getArtistBio,
            getArtistWiki: getArtistWiki
            // filterSearch: filterSearch
        };

        function convertKeysArtworkList(data) {
            for (var ii in data.records) {
                var record = data.records[ii];
                record._id = "HAM_" + record.id;
                record.primaryImageUrl = record.primaryimageurl;
                if (record["people"]) {
                    record._artist = "HAM_"  + record["people"][0]["personid"];
                    delete record.people;
                } else {
                    record._artist = 'HAM_unknown';
                }

                delete record.id;
                delete record.primaryimageurl;
            }
            return data;
        }

        function convertKeysArtwork(data) {
            var ret = {};

            for (var key in artworkKeyConversion) {
                ret[artworkKeyConversion[key]] = data[key];
            }

            // special handling
            ret["_id"] = "HAM_" + data["id"];
            ret["_artist"] = "HAM_" + data["people"][0]["personid"];
            ret["meta.artistName"] = data["people"][0]["displayname"];
            var classification = data["worktypes"][0]["worktype"];
            ret["classification"] = classification.charAt(0).toUpperCase() + classification.slice(1);
            ret["relatedWorks"] = [];

            for (var ii in data["related"]) {
                var work = data["related"][ii]["objectid"];
                work = "HAM_" + work;
                ret["relatedWorks"].push(work);
            }

            ret["images"] = [];
            for (var ii in data["images"]) {
                ret["images"].push(data["images"][ii]["baseimageurl"]);
            }

            return ret;
        }
        
        function searchArtwork(keyword, page) {
            var url = baseUrl + '/object?keyword=' + keyword +
                '&hasImage=1&size=20&fields=id,people,title,primaryimageurl&' + keyParam;
            if (page) {
                url += '&page=' + page;
            }

            return $http.get(url)
                .then(function (response) {
                    return convertKeysArtworkList(response.data);
                });
        }

        function findArtworkById(artworkId) {
            var url = baseUrl + '/object/' + artworkId + '?' + keyParam;
            return $http.get(url)
                .then(function (response) {
                    return convertKeysArtwork(response.data);
                })
        }
        
        function findArtistById(artistId) {
            var url = baseUrl + '/person/' + artistId + '?' + keyParam;
            return $http.get(url)
                .then(function (response) {
                    var data = response.data;
                    data._id = "HAM_" + data.id;
                    data.displayName = data.displayname;
                    delete data.id;
                    delete data.displayname;

                    return data;
                });
        }

        function findArtworksByArtistId(artistId, page) { // for artist objects from HAM api, not actual artist users
            var url = baseUrl + '/object?person=' + artistId +
                '&hasImage=1&fields=id,title,primaryimageurl&size=20&' + keyParam;
            if (page) {
                url += '&page=' + page;
            }
            return $http.get(url)
                .then(function (response) {
                    return convertKeysArtworkList(response.data);
                });
        }

        function getClassificationOptions() {
            var url = baseUrl + '/classification?size=61&sort=name&sortorder=asc&' + keyParam;
            return $http.get(url)
                .then(function (response) {
                    var data = response.data.records;
                    var options = [];
                    for (var ii in data) {
                        options.push(data[ii]["name"]);
                    }
                    return options;
                })
        }

        function getArtistBio(wikiId) {
            var url = wikipediaBaseUrl + '&prop=extracts&exintro=&explaintext=&pageids=' + wikiId;
            return $http.get(url)
                .then(function (response) {
                    return response.data.query.pages.wikiId.extract; // wiki summary
                });
        }

        function getArtistWiki(wikiId) {
            var url = wikipediaBaseUrl + '&prop=info&inprop=url&pageids=' + wikiId;
            return $http.get(url)
                .then(function (response) {
                    return response.data.query.pages.wikiId.canonicalurl;
                });
        }
    }

})();