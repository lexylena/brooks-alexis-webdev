/**
 * Created by alexisbrooks on 6/13/17.
 */
var mongoose = require('mongoose');

var artworkSchema = mongoose.Schema({
    title: {type: String, required: true},
    artistSource: {type: String, enum: ['HAM', 'PROJECT'], required: true}, // PROJECT *ONLY IF* artist is an artist user
    _artist: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    artistHamId: String,
    description: String,
    dateBegin: String,
    dateEnd: String,
    dated: {type: String, required: true}, // created from dateBegin and dateEnd, or createdDate
    classification: {type: String, required: true},
    medium: {type: String},
    technique: String,
    style: String,
    contextualText: {
        text: String,
        context: String,
        date: String,
        type: String
    },
    relatedWorks: [{type: mongoose.Schema.Types.ObjectId, ref: 'ArtworkModel'}],
    images: [{type: String, required: true}],
    primaryImageUrl: {type: String, required: true},
    createdDate: {type: Date, default: Date.now},
    lastUpdated: {type: Date, default: Date.now},
    selectedCount: {type: Number, default: 0}

}, {collection: "artwork"});

module.exports = artworkSchema;

// var keyTranslation = {
//     "datebegin": "dateBegin",
//     "dateend": "dateEnd",
//     "contextualtext": "contextualText",
//     "related": "relatedWorks",
//     "baseimageurl": "imageUrl",
//     "primaryimageurl": "primaryImageUrl",
//     "lastupdate": "lastUpdated"
// };