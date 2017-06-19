/**
 * Created by alexisbrooks on 6/6/17.
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema( {
    username: {type: String, require: true},
    password: {type: String, require: true},
    roles: [{type: String, default: 'CURATOR', enum: ['CURATOR', 'ARTIST', 'ADMIN']}],
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    displayName: {type: String, require: true},
    email: {type: String, require: true},
    bio: String,
    dateCreated: {type: Date, default: Date.now},
    portfolio: [{type: mongoose.Schema.Types.ObjectId, ref: "ArtworkModel"}],
    collections: [{type: mongoose.Schema.Types.ObjectId, ref: "CollectionModel"}],
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    followedArtists: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}]
}, {collection: "project_user"});

module.exports = userSchema;