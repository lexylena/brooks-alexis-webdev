/**
 * Created by alexisbrooks on 5/31/17.
 */
var app = require('../../express');
var userModel = require('../models/user/user.model.server');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var googleConfig = {
//     clientID     : process.env.GOOGLE_CLIENT_ID,
//     clientSecret : process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL  : process.env.GOOGLE_CALLBACK_URL
// };
// passport.use(new GoogleStrategy(googleConfig, googleStrategy));

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


app.get('/api/project/is-logged-in', isLoggedIn);
app.get('/api/project/is-admin', isAdmin);

app.post('/api/project/login', passport.authenticate('local'), login);
app.post('/api/project/logout', logout);
app.post('/api/project/register', register);
app.delete('/api/project/unregister', checkLoggedIn, unregister);
app.put('/api/project/user/:uid', checkLoggedIn, updateUser);
app.put('/api/project/user/add-friend', checkLoggedIn, addFriend); // current user adds another user as friend; friendId as req.query
app.put('/api/project/user/remove-friend', checkLoggedIn, removeFriend);
app.put('/api/project/user/follow-artist', checkLoggedIn, followArtist);
app.put('/api/project/user/unfollow-artist', checkLoggedIn, unfollowArtist);
app.get('/api/project/user/:uid', findUserById);

app.get('/api/project/user', findUser);

app.post('/api/project/user', checkAdmin, createUser);
app.delete('/api/project/user/:uid', checkAdmin, deleteUser);

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/index.html#!/profile',
        failureRedirect: '/project/index.html#!/login'
    }));

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials({username: username, password: password})
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

function isAdminHelp(req) {
    return req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1;
}

function isLoggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function isAdmin(req, res) {
    if (isAdminHelp(req)) {
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
    user.roles = [user.accountType];
    delete user.accountType;

    userModel.createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            })
        }, function (err) {
            res.sendStatus(404);
        })
}

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function unregister(req, res) {
    var uid = req.user._id;
    userModel.deleteUser(uid)
        .then(function (status) {
            res.sendStatus(200);
        })
}

function updateUser(req, res) {
    var updateUser = req.body;
    var uid = req.params['uid'];

    if (req.user._id !== uid && !isAdminHelp(req)) {
        res.sendStatus(401);
        return;
    }

    userModel.updateUser(uid, updateUser)
        .then(function (status) {
            res.sendStatus(200);
        })
}

function addFriend(req, res) {
    friendId = req.body;
    userModel.addFriend(req.user._id, friendId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500);
        })
}

function removeFriend(req, res) {
    friendId = req.body;
    userModel.removeFriend(req.user._id, friendId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500);
        })
}

function followArtist(req, res) {
    artistId = req.body;
    userModel.addFollowedArtist(req.user._id, artistId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500);
        })
}

function unfollowArtist(req, res) {
    artistId = req.body;
    userModel.removeFollowedArtist(req.user._id, artistId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500);
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
    var email = req.query['email'];
    var keyword = req.query['keyword'];
    if (username) {
        // checking username availability for user registration
        userModel.findUserByUsername(username)
            .then(function (found) {
                if (!found) {
                    res.sendStatus(404);
                    return;
                }
                res.json(found);
            })
    } else if (email) {
        // used to check if email already used to register for same account type
        userModel.findUserByEmail(email)
            .then(function (found) {
                if (!found) {
                    res.sendStatus(404);
                    return;
                }
                res.json(found);
            })

    } else if (keyword) {
        // searching for user
        userModel.searchUsers(keyword)
            .then(function (found) {
                res.json(found); //  may be null if no users found
            })
    } else if (isAdminHelp(req)) {
        userModel.findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    } else {
        res.sendStatus(401);
    }
}


function checkAdmin(req, res, next) {
    if (isAdminHelp(req)) {
        next(); // call next function in whatever chain in request
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


module.exports = {
    isAdminHelp: isAdminHelp,
    checkLoggedIn: checkLoggedIn,
    checkAdmin: checkAdmin
};