/**
 * Created by alexisbrooks on 6/13/17.
 */
var mongoose = require('mongoose');
var artworkSchema = require('./artwork.schema.server');

var artworkModel = mongoose.model('ArtworkModel', artworkSchema);

artworkModel.createArtwork = createArtwork;
artworkModel.findArtworkById = findArtworkById;
artworkModel.findAllArtworksByArtist = findAllArtworksByArtist;
artworkModel.updateArtwork = updateArtwork;
artworkModel.incrementSelectedCount = incrementSelectedCount;
artworkModel.deleteArtwork = deleteArtwork;
artworkModel.deleteAllArtworksByArtist = deleteAllArtworksByArtist;
// artworkModel.addRelatedWorks = addRelatedWorks;
// artworkModel.removeRelatedWork = removeRelatedWork;
artworkModel.addImage = addImage;
artworkModel.removeImage = removeImage;

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

function updateArtwork(artworkId, artwork) {
    return artworkModel.update({_id: artworkId}, {
        $set: {
            title: artwork.title,
            description: artwork.description,
            dated: artwork.dated,
            classification: artwork.classification,
            medium: artwork.medium,
            technique: artwork.technique,
            style: artwork.style,
            contextualText: artwork.contextualText,
            primaryImageUrl: artwork.primaryImageUrl
        }})
}

function incrementSelectedCount(artworkId) {
    return artworkModel.update({_id: artworkId}, {$inc: { selectedCount: 1 }});
}

// if artwork is deleted and selection still exists with that artwork, show some like oops this has been deleted thingy
function deleteArtwork(artworkId) {
    return artworkModel.remove({_id: artworkId});
    // then remove from artist's portfolio using userModel.removeArtwork in service.server where this is called
}

function deleteAllArtworksByArtist(artistId) {
    return artworkModel.remove({_artist: artistId});
}

function addImage(artworkId, imageUrl) {
    return artworkModel.findOne({_id: artworkId})
        .then(function (artwork) {
            artwork.images.push(imageUrl);
            return artwork.save();
        })
}

function removeImage(artworkId, imageUrl) {
    return artworkModel.update({_id: artworkId}, {
        $pull: {images: imageUrl}
    })
}

module.exports = artworkModel;