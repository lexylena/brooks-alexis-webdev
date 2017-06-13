/**
 * Created by alexisbrooks on 5/31/17.
 */
var app = require('../../express');
var userModel = require('../models/user/user.model.server');

app.get('/api/assignment/user', findUserByCredentials);
app.get('/api/assignment/user/:uid', findUserById);
app.post('/api/assignment/user', createUser);
app.put('/api/assignment/user/:uid', updateUser);
app.delete('/api/assignment/user/:uid', deleteUser);

// var users = [
//     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
//     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" },
//     {_id: "567", username: "test",     password: "test",     firstName: "test",   lastName: "test"    }
// ];

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    if (!password) {
        userModel.findUserByUsername(username)
            .then(function (found) {
                if (found) {
                    res.sendStatus(404);
                    return;
                }
                res.json(found);
            })
    } else {
        userModel.findUserByCredentials(username, password)
            .then(function (user) {
                    if (user) {
                        res.json(user);
                    } else {
                        res.sendStatus(404);
                    }
                }, function (err) {
                    res.sendStatus(404);
                })
    }
}

function findUserById(req, res) {
    var uid = req.params['uid'];
    userModel.findUserById(uid)
        .then(function (user) {
            res.json(user);
        })
}

function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
        .then(function (user) {
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        })
}

function updateUser(req, res) {
    var user = req.body;
    var uid = req.params['uid'];

    userModel.updateUser(uid, user)
        .then(function (status) {
            res.sendStatus(200);
        })
}

function deleteUser(req, res) {
    var uid = req.params['uid'];
    userModel.deleteUser(uid)
        .then(function (status) {
            res.sendStatus(200);
        })
}