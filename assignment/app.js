/**
 * Created by alexisbrooks on 5/30/17.
 */
var app = require('../express');

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;