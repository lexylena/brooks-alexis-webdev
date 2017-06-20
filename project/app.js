/**
 * Created by alexisbrooks on 6/4/17.
 */
var app = require('../express');

require('./services/user.service.server');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;