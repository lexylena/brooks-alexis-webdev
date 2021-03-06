/**
 * Created by alexisbrooks on 6/19/17.
 */
var app = require('../../express');
var verify = require('./user.service.server');

var userModel = require('../models/user/user.model.server');
var collectionModel = require('../models/collection/collection.model.server');

app.post('/api/project/collection', createCollection);
app.put('/api/project/collection/:collectionId', updateCollection);
app.get('/api/project/collection/:collectionId/curators', getCurators);
app.get('/api/project/collection/:collectionId', findCollectionById);
app.get('/api/project/collection', findCollectionsForUser);
app.delete('/api/project/collection/:collectionId', deleteCollection);


var errMsg = 'Current user not a curator of this collection';

function curatesCollection(user, collectionId) {
    return user.collections.indexOf(collectionId) > -1;
}

function createCollection(req, res) {
    var collection = req.body;
    collectionModel.createCollection(req.user._id, collection)
        .then(function (collection) {
            // adds collection to owner AND all additional curators
            userModel.addCollection(req.user._id, collection._id);
            res.json(collection);
        })
}

function updateCollection(req, res) {
    var collection = req.body;
    var collectionId = req.params['collectionId'];
    userModel.findUserById(req.user._id)
        .then(function (user) {
            if (curatesCollection(user, collectionId)) {
                collectionModel.updateCollection(collectionId, collection)
                    .then(function (response) {
                        res.sendStatus(200);
                    });
            } else {
                res.status(401).send(errMsg);
            }
        })
}

function getCurators(req, res) {
    var collectionId = req.params['collectionId'];
    var filter = {collections: collectionId};
    userModel.filterUsers(filter)
        .then(function (curators) {
            res.json(curators);
        });
}

function findCollectionById(req, res) {
    var collectionId = req.params['collectionId'];
    collectionModel.findCollectionById(collectionId)
        .then(function (collection) {
            res.json(collection);
        })
}

function findCollectionsForUser(req, res) {
    var userId = req.query['curatorId'];
    collectionModel.findCollectionsForUser(userId)
        .then(function (collections) {
            res.json(collections);
        })
}

function deleteCollection(req, res) {
    var collectionId = req.params['collectionId'];
    userModel.findUserById(req.user._id)
        .then(function (user) {
            if (curatesCollection(user, collectionId)) {
                userModel.removeCollectionFromAllUsers(collectionId);
                collectionModel.deleteCollection(collectionId);
                res.sendStatus(200);
            } else {
                res.status(401).send(errMsg);
            }
        })
}