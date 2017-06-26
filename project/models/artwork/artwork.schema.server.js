/**
 * Created by alexisbrooks on 6/13/17.
 */
var mongoose = require('mongoose');

var artworkSchema = mongoose.Schema({
    title: {type: String, required: true},
    _artist: {type: mongoose.Schema.Types.ObjectId, ref: 'PUserModel'},
    description: String,
    date: {type: Date, required: true},
    classification: {type: String, required: true},
    medium: {type: String, required: true},
    technique: String,
    style: String,
    tags: [String],
    relatedWorks: [{type: mongoose.Schema.Types.ObjectId, ref: 'ArtworkModel'}],
    images: [{type: String, required: true}],
    primaryImageUrl: {type: String, required: true},
    createdDate: {type: Date, default: Date.now},
    lastUpdated: {type: Date, default: Date.now},
    selectedCount: {type: Number, default: 0},
    meta: {
        artistName: {type: String, required: true}, // required for keyword search
        imageCount: {type: Number, required: true},
        relatedCount: {type: Number, required: true}
    }

}, {collection: "artwork"});

module.exports = artworkSchema;