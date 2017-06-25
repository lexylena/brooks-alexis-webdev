/**
 * Created by alexisbrooks on 6/13/17.
 */
(function() {
    angular
        .module('project')
        .factory('selectionService', selectionService);

    function selectionService($http) {

        var baseUrl = '/api/project/selection';

        return {
            createSelection: createSelection,
            updateSelection: updateSelection,
            findSelectionById: findSelectionById,
            findSelectionsForCollection: findSelectionsForCollection,
            // findSelectionsForCollectionByUser: findSelectionsForCollectionByUser,
            deleteCollection: deleteSelection
        };

        function createSelection(selection) {
            return $http.post(baseUrl, selection)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateSelection(selectionId, description) {
            var url = baseUrl + '/' + selectionId;
            return $http.put(url, description)
                .then(function (response) {
                    return response.data;
                });
        }

        function findSelectionById(selectionId) {
            var url = baseUrl + '/' + selectionId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findSelectionsForCollection(collectionId) {
            var url = baseUrl + '?collectionId=' + collectionId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteSelection(selectionId) {
            var url = baseUrl + '/' + selectionId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();