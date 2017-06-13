/**
 * Created by alexisbrooks on 6/13/17.
 */
var mongoose = require('mongoose');

var selectionSchema = mongoose.Schema({
    _collection: {type: mongoose.Schema.Types.ObjectId, ref: 'CollectionModel', required: true},
    _artwork: {type: mongoose.Schema.Types.ObjectId, ref: 'ArtworkModel', required: true},
    _curator: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true},
    createdDate: {type: Date, default: Date.now},
    description: String,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'CommentModel'}]

}, {selection: "selection"});

module.exports = selectionSchema;