/**
 * Created by alexisbrooks on 6/20/17.
 */
var app = require('../../express');
var verification = require('./user.service.server');

var commentModel = require('../models/comment/comment.model.server');

app.post('/api/project/comment', verification.checkLoggedIn, addComment);
app.get('/api/project/comment/:commentId', findCommentById);
app.get('/api/project/comment', findCommentsForSelection);
// app.put('/api/project/comment/:commendId', updateComment);
app.delete('/api/project/comment/:commentId', verification.checkLoggedIn, deleteComment);

function addComment(req, res) {
    var comment = req.body;
    commentModel.createComment(req.user._id, comment)
        .then(function (comment) {
            res.json(comment);
        })
}

function findCommentById(req, res) {
    var commentId = req.params['commentId'];
    commentModel.findCommentById(commentId)
        .then(function (comment) {
            res.json(comment);
        })
}

function findCommentsForSelection(req, res) {
    var selectionId = req.query['selection'];
    commentModel.findCommentsForSelection(selectionId)
        .then(function (comments) {
            res.json(comments);
        })
}

function deleteComment(req, res) {
    var commentId = req.params['commentId'];
    commentModel.findCommentById(commentId)
        .then(function (comment) {
            if (comment._user !== req.user._id &&
                !verification.isAdminHelp(req)) {
                res.sendStatus(401);
                return;
            }

            commentModel.deleteComment(commentId)
                .then(function () {
                    res.sendStatus(200);
                })
        })
}