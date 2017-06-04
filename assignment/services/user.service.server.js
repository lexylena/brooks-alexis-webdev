/**
 * Created by alexisbrooks on 5/31/17.
 */
var app = require('../../express');
var bodyParser = require('body-parser');

app.get('/api/assignment/user', findUserByCredentials);
app.get('/api/assignment/user/:uid', findUserById);
app.post('/api/assignment/user', createUser);
app.put('/api/assignment/user/:uid', updateUser);
app.delete('/api/assignment/user/:uid', deleteUser);

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" },
    {_id: "567", username: "test",     password: "test",     firstName: "test",   lastName: "test"    }
];

function findUserByUsername(username) {
    return users.find(function (user) {
        return user.username === username;
    });
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    if (!password) {
        var ret = findUserByUsername(username);
        if (!ret) {
            res.sendStatus(404);
            return;
        }
        res.json(ret);
        return;
    }

    console.log([username, password]);
    for(var u in users) {
        var user = users[u];
        if( user.username === username &&
            user.password === password) {
            res.json(user);
            return;
        }
    }
    res.sendStatus(404);
}

function findUserById(req, res) {
    var userId = req.params['uid'];
    var user = users.find(function (user) {
        return user._id === userId;
    });
    res.send(user);
}

function createUser(req, res) {
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    res.send(user);
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['uid'];
    for(var u in users) {
        if(userId === users[u]._id) {
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteUser(req, res) {
    var userId = req.params['uid'];
    var user = users.find(function (user) {
        return user._id === userId;
    });
    var index = users.indexOf(user);
    users.splice(index, 1);
    res.sendStatus(200);
}