/**
 * Created by alexisbrooks on 6/19/17.
 */
var app = require('../../express');

var artworkModel = require('../models/artwork/artwork.model.server');
var userModel = require('../models/user/user.model.server');

app.post('/api/project/artwork', createArtwork);
app.get('/api/project/artwork/:artworkId', findArtworkById);
app.get('/api/project/artwork', searchArtworks);
app.put('/api/project/artwork/:artworkId', isArtist, updateArtwork);
app.delete('/api/project/artwork/:artworkId', isArtist, deleteArtwork);


function isArtist(req, res, next) {
    var artworkId = req.params['artworkId'];
    artworkModel.findArtworkById(artworkId)
        .then(function (artwork) {
            if (artwork._artist !== req.user._id) {
                res.status(401).send('Current user not artist of artwork');
                return;
            }
            next();
        })
}

function createArtwork(req, res) {
    var artwork = req.body;
    artworkModel.createArtwork(req.user._id, artwork)
        .then(function (artwork) {
            userModel.addArtwork(req.user._id, artwork._id)
                .then(function () {
                    res.json(artwork);
                })
        })
}

function findArtworkById(req, res) {
    var artworkId = req.params['artworkId'];
    artworkModel.findArtworkById(artworkId)
        .then(function (artwork) {
            res.json(artwork);
        })
}

function searchArtworks(req, res) {
    var keyword = req.query['keyword'];
    artworkModel.searchArtwork(keyword)
        .then(function (artworks) {
            res.json(artworks); // may be empty list
        })
}

function updateArtwork(req, res) {
    var artworkId = req.params['artworkId'];
    var artworkUpdate = req.body;
    artworkModel.updateArtwork(artworkId, artworkUpdate)
        .then(function () {
            res.sendStatus(200);
        })
}

function deleteArtwork(req, res) {
    var artworkId = req.params['artworkId'];
    userModel.removeArtwork(req.user._id, artworkId)
        .then(function () {
            artworkModel.deleteArtwork(artworkId)
                .then(function () {
                    res.sendStatus(200);
                })
        })
}