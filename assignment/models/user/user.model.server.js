/**
 * Created by alexisbrooks on 6/6/17.
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var websiteModel = require('../website/website.model.server');

var userModel = mongoose.model('UserModel', userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;

module.exports = userModel;

function createUser(user) {
    user.password = bcrypt.hashSync(user.password);
    return userModel.create(user);
}

function findUserById(uid) {
    return userModel.findOne({_id: uid});
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({"google.id": googleId});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username})
        .then(function (user) {
            if(user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                return null;
            }
        })
}

function deleteUser(uid) {
    return userModel.findOne({_id: uid})
        .then(function (user) {
            return websiteModel.deleteWebsites(user.websites) // delete all user's websites
                .then(function() {
                    return userModel.remove({_id: uid});
                })
        })
}

function updateUser(uid, user) {
    // only update non-null fields
    var update = {};
    var fields = ['firstName', 'lastName', 'password', 'email', 'phone'];
    for (var ii in fields) {
        if (user[fields[ii]]) {
            update[fields[ii]] = user[fields[ii]];
        }
    }
    if (update.password) {
        update.password = bcrypt.hashSync(update.password);
    }

    return userModel.update({_id: uid}, { $set : update });
}

function addWebsite(uid, wid) {
    return userModel.findOne({_id: uid})
        .then(function (user) {
            user.websites.push(wid);
            return user.save();
        })
}

function removeWebsite(uid, wid) {
    return userModel.update({_id: uid}, {
        $pull: {websites: wid}
    })
}