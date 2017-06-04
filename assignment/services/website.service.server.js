/**
 * Created by alexisbrooks on 6/2/17.
 */
var app = require('../../express');
var bodyParser = require('body-parser');

app.post('/api/assignment/user/:uid/website', createWebsite);
app.get('/api/assignment/user/:uid/website', findWebsitesByUser);
app.get('/api/assignment/website/:wid', findWebsiteById);
app.put('/api/assignment/website/:wid', updateWebsite);
app.delete('/api/assignment/website/:wid', deleteWebsite);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" },
    { "_id": "321", "name": "Test",        "developerId": "567", "description": "Lorem" }
];

function createWebsite(req, res) {
    var website = req.body;
    website.developerId = req.params['uid'];
    var now = (new Date()).getTime() + "";
    website.created = now;
    website.updated = now;
    websites.push(website);
    res.json(website);
}

function findWebsitesByUser(req, res) {
    var resultSet = [];
    var uid = req.params['uid'];
    for (var w in websites) {
        if (websites[w].developerId === uid) {
            resultSet.push(websites[w]);
        }
    }

    res.send(resultSet);
}

function findWebsiteById(req, res) {
    var wid = req.params['wid'];
    var website = websites.find(function (website) {
        return website._id === wid;
    });

    if (website) {
        res.json(website);
        return;
    }
    res.sendStatus(404);
}

function updateWebsite(req, res) {
    var website = req.body;
    var wid = req.params['wid'];
    for(var w in websites) {
        if(wid === websites[w]._id) {
            websites[w] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);

}

function deleteWebsite(req, res) {
    var wid = req.params['wid'];
    var website = websites.find(function (website) {
        return website._id === wid;
    });
    var index = websites.indexOf(website);
    websites.splice(index, 1);
    res.sendStatus(200);
}