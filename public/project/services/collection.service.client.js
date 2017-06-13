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
            findCollectionById: findCollectionById,
            // findCollectionsForUser: findCollectionsForUser,
            deleteCollection: deleteCollection
        };

        function createCollection(ownerUid, collection) {

        }

        function updateCollection(collectionId, collection) {

        }

        function findCollectionById(collectionId) {

        }

        function deleteCollection(collectionId) {

        }
    }
})();