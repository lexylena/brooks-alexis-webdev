/**
 * Created by alexisbrooks on 6/6/17.
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var collectionModel = require('../collection/collection.model.server');
var artworkModel = require('../artwork/artwork.model.server');

var userModel = mongoose.model('PUserModel', userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByEmail = findUserByEmail;
userModel.searchUsers = searchUsers;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findAllUsers = findAllUsers;
userModel.filterUsers = filterUsers; // called for finding friends and followed artists lists
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.addCollection = addCollection;
userModel.addFriend = addFriend;
userModel.addFollowedArtist = addFollowedArtist;
userModel.addArtwork = addArtwork;
userModel.removeCollection = removeCollection;
userModel.removeCollectionFromAllUsers = removeCollectionFromAllUsers;
userModel.removeFriend = removeFriend;
userModel.removeFollowedArtist = removeFollowedArtist;
userModel.removeArtwork = removeArtwork;


module.exports = userModel;

function createUser(user) {
    user.displayName = user.firstName;
    if (user.lastName) {
        user.displayName += ' ' + user.lastName;
    }

    user.password = bcrypt.hashSync(user.password);
    return userModel.create(user);
}

function findUserById(uid) {
    return userModel.findOne({_id: uid});
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({"google.id": googleId});
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({"facebook.id": facebookId});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByEmail(email) {
    return userModel.findOne({email: email});
}

function searchUsers(keyword) {
    return userModel.find({$or: [
        {username: {$regex: keyword+'.*'}},
        {firstName: {$regex: keyword+'.*'}},
        {lastName: {$regex: keyword+'.*'}},
        {displayName: {$regex: keyword+'.*'}}
        ]});
}

function findUserByCredentials(username, password) {
    return userModel.findOne(
        {$or: [{username: username}, {email: username}]})
        .then(function (user) {
            if(user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                return null;
            }
        })
}

function findAllUsers() {
    return userModel.find();
}

function filterUsers(filter) {
    return userModel.find(filter);
}

function deleteUser(uid) {
    return userModel.findOne({_id: uid})
        .then(function (user) {
            if (user.roles.indexOf('ARTIST') > -1) {
                return artworkModel.deleteAllArtworksByArtist(uid)
                    .then(function () {
                        return userModel.remove({_id: uid});
                    });
            } else {
                return collectionModel.deleteCollectionsByOwner(uid) // delete all collections where user is owner
                    .then(function () {
                        return userModel.remove({_id: uid});
                    });
            }
        })
}

function updateUser(uid, user) {
    return userModel.update({_id: uid}, {
        $set: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            profileImageUrl: user.profileImageUrl,
            bio: user.bio
        }
    });
}

function addCollection(ownerId, collectionId) {
    return userModel.update({_id: ownerId}, {$push: {collections: collectionId}})
        .then(function () {
            return collectionModel.findOne({_id: collectionId})
                .then(function (collection) {
                    return userModel.update({_id: { $in: collection.curators }},
                        {$push: {collections: collectionId}});
                })
        })
}

function addFriend(uid, friendId) {
    return userModel.update({_id: uid}, {
        $push: {friends: friendId}
    })
        .then(function () {
            return userModel.update({_id: friendId}, {
                $push: {friends: uid}
            });
        });
}

function addFollowedArtist(uid, artistId) {
    return userModel.update({_id: uid}, {
        $push: {followedArtists: artistId}
    })
        .then(function () {
            return userModel.update({_id: artistId}, {
                $push: {followers: uid}
            });
        });
}

function addArtwork(uid, artworkId) {
    return userModel.findOne({_id: uid})
        .then(function (user) {
            user.portfolio.push(artworkId);
            return user.save();
        })
}

function removeCollection(uid, collectionId) {
    return userModel.update({_id: uid}, {
        $pull: {collections: collectionId}
    })
}

function removeCollectionFromAllUsers(collectionId) {
    return collectionModel.findOne({_id: collectionId})
        .then(function (collection) {
            return userModel.update({_id: { $in: collection.curators }},
                {$pull: {collections: collectionId}});
        })
}

function removeFriend(uid, friendId) {
    return userModel.update({_id: uid}, {
        $pull: {friends: friendId}
    })
        .then(function () {
            return userModel.update({_id: friendId}, {
                $pull: {friends: uid}
                });
        });
}

function removeFollowedArtist(uid, artistId) {
    return userModel.update({_id: uid}, {
        $pull: {followedArtists: artistId}
    })
        .then(function () {
            return userModel.update({_id: artistId}, {
                $pull: {followers: uid}
            });
        });
}

function removeArtwork(uid, artworkId) {
    return userModel.update({_id: uid}, {
        $pull: {portfolio: artworkId}
    })
}