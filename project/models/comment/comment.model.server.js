/**
 * Created by alexisbrooks on 6/19/17.
 */
var mongoose = require('mongoose');
var commentSchema = require('./comment.schema.server');

var commentModel = mongoose.model('CommentModel', commentSchema);
commentModel.createComment = createComment;
commentModel.findCommentById = findCommentById;
commentModel.findCommentsForSelection = findCommentsForSelection;
commentModel.updateComment = updateComment;
commentModel.deleteComment = deleteComment;
commentModel.deleteComments = deleteComments;

module.exports = commentModel;

function createComment(uid, comment) {
    comment._user = uid;
    return commentModel.create(comment);
}

function findCommentById(commentId) {

}

function findCommentsForSelection(selectionId) {
    return commentModel.find({_selection: selectionId});
}

function updateComment(commentId, comment) {

}

function deleteComment(commentId) {
    return commentModel.remove({_id: commentId});
}

function deleteComments(selections) {
    return commentModel.remove({_selection: {$in: selections}});
}