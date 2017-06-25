/**
 * Created by alexisbrooks on 6/4/17.
 */
var app = require('../express');


require('./services/user.service.server');
require('./services/collection.service.server');
require('./services/selection.service.server');
require('./services/artwork.service.server');
require('./services/comment.service.server');


var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;