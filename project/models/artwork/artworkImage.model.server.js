/**
 * Created by alexisbrooks on 6/13/17.
 */
var mongoose = require('mongoose');

var artworkImageSchema = mongoose.Schema({
    imageUrl: {type: String, required: true},
    displayOrder: {type: Number, required: true}
}, {collection: "artworkImage"});

var artworkImageModel = mongoose.model('ArtworkImageModel', artworkImageSchema);
module.exports = artworkImageModel;