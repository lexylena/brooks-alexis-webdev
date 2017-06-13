/**
 * Created by alexisbrooks on 6/6/17.
 */

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var websiteModel = require('../website/website.model.server');

var userModel = mongoose.model('UserModel', userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user); // returns promise
}

function findUserById(uid) {
    return userModel.findOne({_id: uid});
}

function findUserByUsername(username) {
    return userModel.find({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password}); // returns null if not found
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

function updateUser(uid, newUser) {
    return userModel.update({_id: uid}, {
        // only allow client to update these fields
        $set : {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            password: newUser.password,
            email: newUser.email,
            phone: newUser.phone
        }
    })
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