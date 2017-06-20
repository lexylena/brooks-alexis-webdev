var express = require('express');
var app = require('./express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

/*
var myApp = require('./lectures/todo/app.js');
console.log(myApp);
console.log(sayHello);
myApp('this is the message');
*/
var todo = require('./lectures/todo/app.js');
todo(app);

require('./assignment/app.js');
require('./project/app.js');

require('./lectures/ejs/crud');
require('./lectures/wam/index')({
    "name": "movieApp",
    "entities": {
        "movie": {},
        "actor": {}
    }
});

app.listen(port);