/**
 * Created by alexisbrooks on 6/13/17.
 */
(function() {
    angular
        .module('project')
        .factory('collectionService', collectionService);

    function collectionService($http) {

        var baseUrl = '/api/project/collection';

        return {
            createCollection: createCollection,
            updateCollection: updateCollection,
            addCurator: addCurator,
            removeCurator: removeCurator,
            findCollectionById: findCollectionById,
            findCollectionsForUser: findCollectionsForUser,
            deleteCollection: deleteCollection
        };

        function createCollection(collection) {
            return $http.post(baseUrl, collection)
                .then(function (response) {
                    return response.data; // new collection
                })
        }

        function updateCollection(collectionId, collection) {
            var url = baseUrl + '/' + collectionId;
            return $http.put(url, collection)
                .then(function (response) {
                    return response.data; // status
                })
        }

        function addCurator(collectionId, userId) {
            var url = baseUrl + '/' + collectionId + '/addCurator';
            return $http.put(url, userId)
                .then(function (response) {
                    return response.data; // status
                })
        }

        function removeCurator(collectionId, userId) {
            var url = baseUrl + '/' + collectionId + '/removeCurator';
            return $http.delete(url, userId)
                .then(function (response) {
                    return response.data; // status
                })
        }

        function findCollectionById(collectionId) {
            var url = baseUrl + '/' + collectionId;
            return $http.get(url)
                .then(function (response) {
                    return response.data; // collection
                })
        }

        function findCollectionsForUser(userId) {
            var url = baseUrl + '?curator-id=' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data; // list of collections
                })
        }

        function deleteCollection(collectionId) {
            var url = baseUrl + '/' + collectionId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data; // status code
                })
        }
    }
})();