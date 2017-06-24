/**
 * Created by alexisbrooks on 6/13/17.
 */
var mongoose = require('mongoose');

var collectionSchema = mongoose.Schema({
    _owner: {type: mongoose.Schema.Types.ObjectId, ref: 'PUserModel', required: true},
    name: {type: String, required: true},
    description: String,
    cover: {type: String, default: '/project/uploads/image_placeholder.png'},
    createdDate: {type: Date, default: Date.now},
    lastUpdated: {type: Date, default: Date.now},
    // lastUpdatedBy: {type: mongoose.Schema.Types.ObjectId, default: _owner},
    curators: [{type: mongoose.Schema.Types.ObjectId, ref: 'PUserModel'}],
    selections: [{type: mongoose.Schema.Types.ObjectId, ref: 'SelectionModel'}]

}, {collection: "collection"});

module.exports = collectionSchema;