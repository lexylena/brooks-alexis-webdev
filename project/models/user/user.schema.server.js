/**
 * Created by alexisbrooks on 6/6/17.
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema( {
    username: {type: String, require: true},
    password: {type: String, require: true},
    roles: [{type: String, default: 'CURATOR', enum: ['CURATOR', 'ARTIST', 'ADMIN']}],
    firstName: {type: String, require: true},
    lastName: {type: String},
    displayName: {type: String, require: true},
    email: {type: String, require: true},
    profileImageUrl: {type: String, default: "/project/uploads/user/user_image_placeholder.png"},
    bio: String,
    dateCreated: {type: Date, default: Date.now},
    portfolio: [{type: mongoose.Schema.Types.ObjectId, ref: "ArtworkModel"}],
    collections: [{type: mongoose.Schema.Types.ObjectId, ref: "CollectionModel"}],
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: "PUserModel"}],
    followedArtists: [{type: mongoose.Schema.Types.ObjectId, ref: "PUserModel"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "PUserModel"}]
}, {collection: "project_user"});

module.exports = userSchema;