/**
 * Created by alexisbrooks on 5/31/17.
 */
var app = require('../../express');
var userModel = require('../models/user/user.model.server');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


app.get('/api/assignment/checkLoggedIn', checkLoggedIn);
app.post('/api/assignment/login', passport.authenticate('local'), login);
app.post('/api/assignment/logout', logout);
app.post('/api/assignment/register', register);
app.delete('/api/assignment/unregister', unregister);
app.put('/api/assignment/user/:uid', updateUser);
app.get('/api/assignment/user/:uid', findUserById);
app.get('/api/assignment/user', findUser);

app.post('/api/assignment/user', checkAdmin, createUser);
app.delete('/api/assignment/user/:uid', checkAdmin, deleteUser);

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }));

// var users = [
//     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
//     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" },
//     {_id: "567", username: "test",     password: "test",     firstName: "test",   lastName: "test"    }
// ];

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}


function checkLoggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var user = req.body;
    user.roles = ['USER'];
    userModel.createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            })
        }, function (err) {
            res.sendStatus(404);
        })
}

function unregister(req, res) {
    var uid = req.user._id;
    userModel.deleteUser(uid)
        .then(function (status) {
            res.sendStatus(200);
        })
}

function updateUser(req, res) {
    var user = req.body;
    var uid = req.params['uid'];

    if (uid !== req.user._id && req.user.roles.indexOf('ADMIN') > -1) {
        res.sendStatus(401); // non-admin can only update self
        return;
    }

    userModel.updateUser(uid, user)
        .then(function (status) {
            res.sendStatus(200);
        })
}

function findUserById(req, res) {
    var uid = req.params['uid'];
    userModel.findUserById(uid)
        .then(function (user) {
            res.json(user);
        })
}

function findUser(req, res) {
    var username = req.query['username'];
    if (username) {
        userModel.findUserByUsername(username)
            .then(function (found) {
                if (found === null) {
                    res.sendStatus(404);
                    return;
                }
                res.json(found);
            })
    } else {
        checkAdmin(req, res, function() {
            userModel.findAllUsers()
                .then(function (users) {
                    res.json(users);
                })
        })
    }
}

function checkAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
        .then(function (user) {
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        })
}

function deleteUser(req, res) {
    var uid = req.params['uid'];
    userModel.deleteUser(uid)
        .then(function (status) {
            res.sendStatus(200);
        })
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}