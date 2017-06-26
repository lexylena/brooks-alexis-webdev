/**
 * Created by alexisbrooks on 6/13/17.
 */
var mongoose = require('mongoose');
var artworkSchema = require('./artwork.schema.server');

var artworkModel = mongoose.model('ArtworkModel', artworkSchema);

artworkModel.createArtwork = createArtwork;
artworkModel.findArtworkById = findArtworkById;
artworkModel.findAllArtworksByArtist = findAllArtworksByArtist;
artworkModel.findRelatedWorks = findRelatedWorks;
artworkModel.searchArtwork = searchArtwork;
// artworkModel.filterSearch = filterSearch;
artworkModel.updateArtwork = updateArtwork;
artworkModel.incrementSelectedCount = incrementSelectedCount;
artworkModel.deleteArtwork = deleteArtwork;
artworkModel.deleteAllArtworksByArtist = deleteAllArtworksByArtist;
artworkModel.addRelatedWorks = addRelatedWorks;
// artworkModel.removeRelatedWork = removeRelatedWork;
artworkModel.addImages = addImages;
artworkModel.removeImage = removeImage;

module.exports = artworkModel;

function createArtwork(artistId, artwork) {
    artwork._artist = artistId;
    return artworkModel.create(artwork);
}

function findArtworkById(artworkId) {
    return artworkModel.findOne({_id: artworkId});
}

function findAllArtworksByArtist(artistId) {
    return artworkModel.find({_artist: artistId});
}

function findRelatedWorks(artworkId) {
    return artworkModel.findOne({_id: artworkId})
        .then(function (artwork) {
            return artworkModel.find({_id: { $in: artwork.relatedWorks }});
        });
}

function searchArtwork(keyword) {
    return artworkModel.find({$or: [
        {"title": {$regex: keyword+'.*'}},
        {"meta.artistName": {$regex: keyword+'.*'}}
    ]});
}

function updateArtwork(artworkId, artwork) {
    return artworkModel.update({_id: artworkId}, { $set: artwork })
}

function incrementSelectedCount(artworkId) {
    return artworkModel.update({_id: artworkId}, {$inc: { selectedCount: 1 }});
}

// if artwork is deleted and selection still exists with that artwork, show some like oops this has been deleted thingy
function deleteArtwork(artworkId) {
    return artworkModel.findOne({_id: artworkId})
        .then(function (artwork) {
            return artworkModel.update({_id: {$in: artwork.relatedWorks}}, {
                $pull: {relatedWorks: artworkId},
                $inc: {"meta.relatedCount": -1}
            })
                .then(function (status) {
                    return artworkModel.remove({_id: artworkId});
                });
        });
    // then remove from artist's portfolio using userModel.removeArtwork in service.server where this is called
}

function deleteAllArtworksByArtist(artistId) {
    return artworkModel.remove({_artist: artistId});
}

function addRelatedWorks(artworkId, relatedWorks) {
    return artworkModel.findOne({_id: artworkId})
        .then(function (artwork) {
            artwork.relatedWorks.push(relatedWorks);
            artwork.meta.relatedCount = artwork.relatedWorks.length;
            return artwork.save()
                .then(function () {
                    return artworkModel.update({_id: {$in: relatedWorks}}, {
                        $push: {relatedWorks: artworkId},
                        $inc: {"meta.relatedCount": 1}
                    });
                });
        });
}

function addImages(artworkId, images) {
    return artworkModel.update({_id: artworkId}, {
        $push: {images: images}
    });
}

function removeImage(artworkId, imageUrl) {
    return artworkModel.update({_id: artworkId}, {
        $pull: {images: imageUrl}
    })
}