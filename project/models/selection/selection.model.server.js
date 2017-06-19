/**
 * Created by alexisbrooks on 6/19/17.
 */
var mongoose = require('mongoose');
var selectionSchema = require('./selection.schema.server');
var commentModel = require('../comment/comment.model.server');

var selectionModel = mongoose.model('SelectionModel', selectionSchema);
selectionModel.createSelection = createSelection;
selectionModel.findSelectionById = findSelectionById;
selectionModel.findSelectionsForCollection = findSelectionsForCollection;
selectionModel.updateSelection = updateSelection;
selectionModel.addComment = addComment;
selectionModel.removeComment = removeComment;
selectionModel.deleteSelection = deleteSelection;
selectionModel.deleteSelections = deleteSelections;

module.exports = selectionModel;

function createSelection(curatorId, selection) {
    selection._curator = curatorId;
    return selectionModel.create(selection);
}

function findSelectionById(selectionId) {
    return selectionModel.findOne({_id: selectionId});
}

function findSelectionsForCollection(collectionId) {
    return selectionModel.find({_collection: collectionId});
}

function updateSelection(selectionId, description) {
    return selectionModel.update({_id: selectionId}, {$set: {description: description}});
}

function addComment(selectionId, commentId) {
    return selectionModel.update({_id: selectionId},
        {$push: {comments: commentId}});
}

function removeComment(selectionId, commentId) {
    return selectionModel.update({_id: selectionId},
        {$pull: {comments: commentId}});
}

function deleteSelection(selectionId) {
    return selectionModel.findOne({_id: selectionId})
        .then(function (selection) {
            return commentModel.deleteComments([selection])
                .then(function () {
                    return selectionModel.remove({_id: selectionId});
                })
        })
}

function deleteSelections(collections) {
    return selectionModel.find({_collection: {$in: collections}})
        .then(function (selections) {
            return commentModel.deleteComments(selections)
                .then(function () {
                    return selectionModel.remove({_collection: {$in: collections}});
                })
        })
}