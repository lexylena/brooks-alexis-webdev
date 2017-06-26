/**
 * Created by alexisbrooks on 6/19/17.
 */
var app = require('../../express');
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/project/uploads/artwork' });

var artworkModel = require('../models/artwork/artwork.model.server');
var userModel = require('../models/user/user.model.server');

app.post('/api/project/artwork', createArtwork);
app.post('/api/project/artwork/upload', upload.array('artworkFiles', 12), uploadImages);
app.get('/api/project/artwork/:artworkId', findArtworkById);
app.get('/api/project/artwork', searchArtworks);
app.get('/api/project/artwork/:artworkId/relatedWorks', findRelatedWorks);
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
    var relatedWorks = artwork.relatedWorks;
    artwork.primaryImageUrl = artwork.images[0];
    userModel.findUserById(req.user._id)
        .then(function (user) {
            artwork.meta = {
                artistName: user.displayName,
                imageCount: artwork.images.length,
                relatedCount: 0
            };

            delete artwork.relatedWorks;
        })
        .then(function () {
            artworkModel.createArtwork(req.user._id, artwork)
                .then(function (artwork) {
                    userModel.addArtwork(req.user._id, artwork._id);
                    artworkModel.addRelatedWorks(artwork._id, relatedWorks);
                    res.json(artwork);
                });
        });
}

function uploadImages(req, res) {
    var artworkFiles = req.files;

    var uid = req.user._id;
    var redirectUrl = req.body.redirectUrl;
    var images = [];
    for (var ii in artworkFiles) {
        images.push('/project/uploads/artwork/'+artworkFiles[ii].filename);
    }

    userModel.updateTmp(uid, images)
        .then(function (status) {
            res.redirect('/project/index.html' + redirectUrl);
        });
}

function findArtworkById(req, res) {
    var artworkId = req.params['artworkId'];
    artworkModel.findArtworkById(artworkId)
        .then(function (artwork) {
            res.json(artwork);
        })
}

function searchArtworks(req, res) {
    var artistId = req.query['artistId'];
    if (artistId) {
        artworkModel.findAllArtworksByArtist(artistId)
            .then(function (artworks) {
                res.json(artworks);
            });
    } else {

        var keyword = req.query['keyword'];
        artworkModel.searchArtwork(keyword)
            .then(function (artworks) {
                res.json(artworks); // may be empty list
            })
    }
}

function findRelatedWorks(req, res) {
    var artworkId = req.params['artworkId'];
    artworkModel.findRelatedWorks(artworkId)
        .then(function (artworks) {
            res.json(artworks);
        })
}

function updateArtwork(req, res) {
    var artworkId = req.params['artworkId'];
    var artwork = req.body;

    var update = {};
    var fields = ['title', 'description', 'date', 'classification', 'medium',
        'technique', 'style', 'tags', 'primaryImageUrl'];
    for (var ii in fields) {
        var field = fields[ii];
        if (artwork[field]) {
            update[field] = artwork[field];
        }
    }

    artworkModel.updateArtwork(artworkId, update)
        .then(function () {
            if (artwork.relatedMap !== artwork.initialRelatedMap) {
                // relatedWorks changed
                var newRelated = [];
                for (var id in artwork.relatedMap) {
                    if (!artwork.initialRelatedMap[id]) {
                        newRelated.push(id);
                    }
                }
                artworkModel.addRelatedWorks(artworkId, newRelated);
            }

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