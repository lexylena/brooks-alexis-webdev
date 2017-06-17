/**
 * Created by alexisbrooks on 6/2/17.
 */
var app = require('../../express');
var websiteModel = require('../models/website/website.model.server');
var userModel = require('../models/user/user.model.server');

app.post('/api/assignment/website', createWebsite);
app.get('/api/assignment/website', findWebsitesByUser);
app.get('/api/assignment/website/:wid', findWebsiteById);
app.put('/api/assignment/website/:wid', isDeveloper, updateWebsite);
app.delete('/api/assignment/website/:wid', isDeveloper, deleteWebsite);
app.get('/api/assignment/checkWebsiteDeveloper', checkWebsiteDeveloper);

// var websites = [
//     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
//     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
//     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
//     { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
//     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
//     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
//     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" },
//     { "_id": "321", "name": "Test",        "developerId": "567", "description": "Lorem" }
// ];

function createWebsite(req, res) {
    var website = req.body;
    var uid = req.user._id;
    websiteModel.createWebsite(uid, website)
        .then(function (website) {
            userModel.addWebsite(uid, website._id)
                .then(function () {
                    res.json(website);
                })
        })
}

function findWebsitesByUser(req, res) {
    var uid = req.user._id;
    websiteModel.findAllWebsitesForUser(uid)
        .then(function (websites) {
            res.json(websites);
        })
}

function findWebsiteById(req, res) {
    var wid = req.params['wid'];
    websiteModel.findWebsiteById(wid)
        .then(function (website) {
            if (website) {
                res.json(website);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        })
}

function updateWebsite(req, res) {
    var website = req.body;
    var wid = req.params['wid'];
    websiteModel.updateWebsite(wid, website)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        })
}

function deleteWebsite(req, res) {
    var wid = req.params['wid'];
    websiteModel.findWebsiteById(wid)
        .then(function (website) {
            var uid = website._user;
            websiteModel.deleteWebsites([wid])
                .then(function (status) {
                    userModel.removeWebsite(uid, wid)
                        .then(function () {
                            res.sendStatus(200);
                        })
                }, function (err) {
                    res.sendStatus(404);
                })
        })
}

function isDeveloper(req, res, next) {
    var wid = req.params['wid'];
    websiteModel.findWebsiteById(wid)
        .then(function (website) {
            if (website._user.toString() !== req.user._id.toString()) {
                res.sendStatus(401);
            } else {
                next();
            }
        });
}

function checkWebsiteDeveloper(req, res) {
    var wid = req.query['wid'];
    websiteModel.findWebsiteById(wid)
        .then(function (website) {
            if (!req.isAuthenticated() || website._user.toString() !== req.user._id.toString()) {
                res.send('0');
            } else {
                res.json(req.user);
            }
        })
}