/**
 * Created by alexisbrooks on 6/19/17.
 */
var app = require('../../express');

var selectionModel = require('../models/selection/selection.model.server');
var collectionModel = require('../models/collection/collection.model.server');

app.post('/api/project/selection', createSelection);
app.put('/api/project/selection/:selectionId', updateSelection);
app.get('/api/project/selection/:selectionId', findSelectionById);
app.get('/api/project/selection', findSelectionsForCollection);
app.delete('/api/project/selection/:selectionId', deleteSelection);


function createSelection(req, res) {
    var selection = req.body;
    selectionModel.createSelection(req.user._id, selection)
        .then(function (selection) {
            collectionModel.addSelection(selection._collection, selection._id)
                .then(function () {
                    res.json(selection);
                })
        })
}

function updateSelection(req, res) {
    var selectionId = req.params['selectionId'];
    var description = req.body;
    selectionModel.updateSelection(selectionId, description)
        .then(function () {
            res.sendStatus(200);
        })
}

function findSelectionById(req, res) {
    var selectionId = req.params['selectionId'];
    selectionModel.findSelectionById(selectionId)
        .then(function (selection) {
            res.json(selection);
        })
}

function findSelectionsForCollection(req, res) {
    var collectionId = req.query['collection-id'];
    selectionModel.findSelectionsForCollection(collectionId)
        .then(function (selections) {
            res.json(selections);
        })
}

function deleteSelection(req, res) {
    var selectionId = req.params['selectionId'];
    selectionModel.findSelectionById(selectionId)
        .then(function (selection) {
            collectionModel.removeSelection(selection._collection, selection._id)
                .then(function () {
                    selectionModel.deleteSelection(selectionId)
                        .then(function () {
                            res.sendStatus(200);
                        })
                })
        })
}
