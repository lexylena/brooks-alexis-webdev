/**
 * Created by alexisbrooks on 6/13/17.
 */
var mongoose = require('mongoose');

var selectionSchema = mongoose.Schema({
    _collection: {type: mongoose.Schema.Types.ObjectId, ref: 'CollectionModel', required: true},
    _artwork: {type: mongoose.Schema.Types.ObjectId, ref: 'ArtworkModel'},
    hamArtworkId: String,
    _curator: {type: mongoose.Schema.Types.ObjectId, ref: 'PUserModel', required: true},
    createdDate: {type: Date, default: Date.now},
    description: String,
    defaultDescription: {type: Boolean, default: false},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'CommentModel'}],
    meta: {
        title: {type: String, required: true},
        artistName: {type: String, required: true},
        primaryImageUrl: {type: String, required: true}
    }
}, {collection: "selection"});

module.exports = selectionSchema;