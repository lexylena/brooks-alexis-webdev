/**
 * Created by alexisbrooks on 6/4/17.
 */
var app = require('../express');

app.get('/hamApiKey', function(req, res) {
    var key = process.env.HAM_API_KEY;
    res.send(key);
});

require('./services/user.service.server');
require('./services/collection.service.server');
require('./services/selection.service.server');
require('./services/artwork.service.server');
require('./services/comment.service.server');


var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;