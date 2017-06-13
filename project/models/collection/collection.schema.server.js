/**
 * Created by alexisbrooks on 6/13/17.
 */
var mongoose = require('mongoose');

var collectionSchema = mongoose.Schema({
    _owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true},
    name: {type: String, required: true},
    description: String,
    createdDate: {type: Date, default: Date.now},
    lastUpdated: {type: Date, default: Date.now},
    lastUpdatedBy: {type: mongoose.Schema.Types.ObjectId, default: _owner},
    curators: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    selections: [{type: mongoose.Schema.Types.ObjectId, ref: 'SelectionModel'}]

}, {collection: "collection"});

module.exports = collectionSchema;