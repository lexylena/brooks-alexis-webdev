/**
 * Created by alexisbrooks on 6/2/17.
 */
var app = require('../../express');
var pageModel = require('../models/page/page.model.server');
var websiteModel = require('../models/website/website.model.server');

app.post('/api/assignment/website/:wid/page', createPage);
app.get('/api/assignment/website/:wid/page', findPageByWebsiteId);
app.get('/api/assignment/page/:pid', findPageById);
app.put('/api/assignment/page/:pid', updatePage);
app.delete('/api/assignment/page/:pid', deletePage);

// var pages = [
//     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
//     { "_id": "654", "name": "TestPage", "websiteId": "321", "description": "Lorem" }
// ];

function createPage(req, res) {
    var page = req.body;
    var wid = req.params['wid'];

    pageModel.createPage(wid, page)
        .then(function (page) {
            websiteModel.addPage(wid, page._id)
                .then(function () {
                    res.json(page);
                })
        })
}

function findPageByWebsiteId(req, res) {
    var wid = req.params['wid'];
    pageModel.findAllPagesForWebsite(wid)
        .then(function (pages) {
            res.json(pages);
        })
}

function findPageById(req, res) {
    var pid = req.params['pid'];
    pageModel.findPageById(pid)
        .then(function (page) {
            if (page) {
                res.json(page);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        })
}

function updatePage(req, res) {
    var page = req.body;
    var pid = req.params['pid'];

    pageModel.updatePage(pid, page)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        })
}

function deletePage(req, res) {
    var pid = req.params['pid'];
    pageModel.findPageById(pid)
        .then(function (page) {
            var wid = page._website;
            pageModel.deletePages([pid])
                .then(function (status) {
                    websiteModel.removePage(wid, pid)
                        .then(function () {
                            res.sendStatus(200);
                        })
                }, function (err) {
                    res.sendStatus(404);
                })
        })
}
