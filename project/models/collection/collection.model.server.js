/**
 * Created by alexisbrooks on 6/19/17.
 */
var mongoose = require('mongoose');
var collectionSchema = require('./collection.schema.server');
var selectionModel = require('../selection/selection.model.server');

var collectionModel = mongoose.model('CollectionModel', collectionSchema);
collectionModel.createCollection = createCollection;
collectionModel.findCollectionById = findCollectionById;
collectionModel.findCollectionsForUser = findCollectionsForUser;
collectionModel.updateCollection = updateCollection;
collectionModel.addSelection = addSelection;
collectionModel.removeSelection = removeSelection;
collectionModel.addCurator = addCurator;
collectionModel.removeCurator = removeCurator;
collectionModel.deleteCollection = deleteCollection;
collectionModel.deleteCollectionsByOwner = deleteCollectionsByOwner;

module.exports = collectionModel;

function createCollection (uid, collection) {
    collection._owner = uid;
    return collectionModel.create(collection);
    // then in service.server where this is called, userModel.addCollection will add collection to all curators
}

function findCollectionById(collectionId) {
    return collectionModel.findOne({_id: collectionId});
}

function findCollectionsForUser(uid) {
    return collectionModel.find({$or: [ {_owner: uid}, {curators: uid} ]});
}

function updateCollection(collectionId, collection) {
    return collectionModel.update({_id: collectionId},
        {$set: {name: collection.name, description: collection.description}});
}

function addSelection(collectionId, selectionId) {
    return collectionModel.update({_id: collectionId}, {$push: {selections: selectionId}});
}

function removeSelection(collectionId, selectionId) {
    return collectionModel.update({_id: collectionId}, {$pull: {selections: selectionId}});
}

function addCurator(collectionId, uid) {
    return collectionModel.update({_id: collectionId}, {$push: {curators: uid}});
}

function removeCurator(collectionId, uid) {
    return collectionModel.update({_id: collectionId}, {$pull: {curators: uid}});
}

function deleteCollection(collectionId) {
    // before this is called, userModel.removeCollectionFromAllUsers should be called in service.server
    return selectionModel.deleteSelections([collection])
        .then(function () {
            return collectionModel.remove({_id: collectionId});
        })
}

function deleteCollectionsByOwner(ownerId) {
    // cascade deletion for when a user is deleted
    return collectionModel.find({_owner: ownerId, curators: []})
        .then(function (collections) {
            return selectionModel.deleteSelections(collections)
                .then(function() {
                    return collectionModel.remove({_owner: ownerId, curators: []});
                })
        })
}