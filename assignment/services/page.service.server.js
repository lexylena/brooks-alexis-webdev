/**
 * Created by alexisbrooks on 6/2/17.
 */
var app = require('../../express');
var bodyParser = require('body-parser');

app.post('/api/assignment/website/:wid/page', createPage);
app.get('/api/assignment/website/:wid/page', findPageByWebsiteId);
app.get('/api/assignment/page/:pid', findPageById);
app.put('/api/assignment/page/:pid', updatePage);
app.delete('/api/assignment/page/:pid', deletePage);

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
    { "_id": "654", "name": "TestPage", "websiteId": "321", "description": "Lorem" }
];

function createPage(req, res) {
    var page = req.body;
    page.websiteId = req.params['wid'];
    var now = (new Date()).getTime() + "";
    page.created = now;
    page.updated = now;
    pages.push(page);
    res.json(page);
}

function findPageByWebsiteId(req, res) {
    var resultSet = [];
    var wid = req.params['wid'];
    for (var p in pages) {
        if (pages[p].websiteId === wid) {
            resultSet.push(pages[p]);
        }
    }

    res.send(resultSet);
}

function findPageById(req, res) {
    var pid = req.params['pid'];
    var page = pages.find(function (page) {
        return page._id === pid;
    });

    if (page) {
        res.json(page);
        return;
    }
    res.sendStatus(404);
}

function updatePage(req, res) {
    var page = req.body;
    var pid = req.params['pid'];
    for(var p in pages) {
        if(pid === pages[p]._id) {
            pages[p] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req, res) {
    var pid = req.params['pid'];
    var page = pages.find(function (page) {
        return page._id === id;
    });
    var index = pages.indexOf(page);
    pages.splice(index, 1);
    res.sendStatus(200);
}
