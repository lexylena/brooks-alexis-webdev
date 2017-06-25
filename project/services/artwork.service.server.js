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
    artwork.primaryImageUrl = artwork.images[0];
    userModel.findUserById(req.user._id)
        .then(function (user) {
            artwork.meta = {
                artistName: user.displayName,
                imageCount: artwork.images.length,
                relatedCount: 0
            };

            if (artwork.relatedWorks) {
                artwork.meta.relatedCount = artwork.relatedWorks.length;
            }
        })
        .then(function () {
            artworkModel.createArtwork(req.user._id, artwork)
                .then(function (artwork) {
                    userModel.addArtwork(req.user._id, artwork._id)
                        .then(function () {
                            res.json(artwork);
                        });
                });
        });
}

function uploadImages(req, res) {
    var artworkFiles = req.files;

    var uid = req.user._id;
    var images = [];
    for (var ii in artworkFiles) {
        // var originalname = myFile.originalname; // file name on user's computer
        // var filename = artworkFiles[ii].filename;     // new file name in upload folder
        // var path = myFile.path;         // full path of uploaded file
        // var destination = myFile.destination;  // folder where file is saved to
        // var size = myFile.size;
        // var mimetype = myFile.mimetype;
        images.push('/project/uploads/artwork/'+artworkFiles[ii].filename);
    }

    userModel.updateTmp(uid, images)
        .then(function (status) {
            res.redirect('/project/index.html#!/artwork/new');
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