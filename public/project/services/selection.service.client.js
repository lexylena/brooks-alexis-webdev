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

        function createSelection(collectionId, selection) {

        }

        function updateSelection(selectionId, selection) {

        }

        function findSelectionById(selectionId) {

        }

        function findSelectionsForCollection(collectionId) {

        }

        function deleteSelection(selectionId) {

        }
    }
})();