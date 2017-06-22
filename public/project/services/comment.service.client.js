/**
 * Created by alexisbrooks on 6/13/17.
 */
(function() {
    angular
        .module('project')
        .factory('commentService', commentService);

    function commentService($http) {

        var baseUrl = '/api/project/comment';

        return {
            addComment: addComment,
            findCommentById: findCommentById,
            findCommentsForSelection: findCommentsForSelection,
            deleteComment: deleteComment
        //    update?
        };

        function addComment(selectionId, comment) {
            comment._selection = selectionId;
            return $http.post(baseUrl, comment)
                .then(function (response) {
                    return response.data;
                })
        }

        function findCommentById(commentId) {
            var url = baseUrl + '/' + commentId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findCommentsForSelection(selectionId) {
            var url = baseUrl + '?selection=' + selectionId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteComment(commentId) {
            var url = baseUrl + '/' + commentId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();