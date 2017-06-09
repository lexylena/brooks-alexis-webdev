/**
 * Created by alexisbrooks on 6/6/17.
 */

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model('UserModel', userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user); // returns promise
}

function findUserById(uid) {
    return userModel.findById(uid);
}

function findUserByUsername(username) {
    return userModel.find({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password}); // returns null if not found
}

function deleteUser(uid) {
    return userModel.remove({_id: uid});
}

function updateUser(uid, newUser) {
    return userModel.update({_id: uid}, {
        // only allow client to update these fields
        $set : {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        }
    })
}