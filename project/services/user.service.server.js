/**
 * Created by alexisbrooks on 5/31/17.
 */
var app = require('../../express');
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/project/uploads/user' });

var userModel = require('../models/user/user.model.server');
var collectionModel = require('../models/collection/collection.model.server');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var googleConfig = {
//     clientID     : process.env.GOOGLE_CLIENT_ID,
//     clientSecret : process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL  : process.env.GOOGLE_CALLBACK_URL
// };
// passport.use(new GoogleStrategy(googleConfig, googleStrategy));

passport.use('local.project', new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


app.get('/api/project/isLoggedIn', isLoggedIn);
app.get('/api/project/isAdmin', isAdmin);

app.post('/api/project/login', passport.authenticate('local.project'), login);
app.post('/api/project/logout', logout);
app.post('/api/project/register', register);
app.delete('/api/project/unregister', checkLoggedIn, unregister);
app.put('/api/project/user/:uid', checkLoggedIn, updateUser);
app.post('/api/project/user/resetTmp', checkLoggedIn, resetTmp);
app.post('/api/project/user/uploadProfileImage', upload.single('myFile'), uploadImage);
app.post('/api/project/user/addFriend', checkLoggedIn, addFriend); // current user adds another user as friend; friendId as req.query
app.delete('/api/project/user/removeFriend', checkLoggedIn, removeFriend);
app.post('/api/project/user/followArtist', checkLoggedIn, followArtist);
app.delete('/api/project/user/unfollowArtist', checkLoggedIn, unfollowArtist);
app.get('/api/project/user/:uid', findUserById);
app.get('/api/project/user/:uid/:listType', findUserList);

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

function isAdminHelp(req) {
    return req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1;
}

function getUserType(req) {
    if (!req.isAuthenticated()) {
        return null;
    } else if (req.user.roles.indexOf('ARTIST') > -1) {
        return 'ARTIST';
    } else {
        return 'CURATOR';
    }
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

    if (req.user._id.toString() !== uid && !isAdminHelp(req)) {
        res.sendStatus(401);
        return;
    }

    userModel.updateUser(uid, updateUser)
        .then(function (status) {
            res.sendStatus(200);
        })
}

function resetTmp(req, res) {
    var uid = req.user._id;
    userModel.updateTmp(uid, [])
        .then(function (status) {
            res.sendStatus(200);
        });
}

function uploadImage(req, res) {
    var myFile = req.file;

    var uid = req.user._id;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var user = {profileImageUrl: '/project/uploads/user/' + filename};
    userModel.updateUser(uid, user)
        .then(function (status) {
            res.redirect('/project/index.html#!/settings');
        })
}

function addFriend(req, res) {
    friendId = req.body.friend;
    userModel.addFriend(req.user._id, friendId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500);
        })
}

function removeFriend(req, res) {
    friendId = req.query['friendId'];
    userModel.removeFriend(req.user._id, friendId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500);
        })
}

function followArtist(req, res) {
    artistId = req.body.artist;
    userModel.addFollowedArtist(req.user._id, artistId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500);
        })
}

function unfollowArtist(req, res) {
    artistId = req.query['artistId'];
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

function findUserList(req, res) {
    var uid = req.params['uid'];
    var listType = req.params['listType'];
    var filter = {};
    var filterKeys = {
        "friends": "friends",
        "followers": "followedArtists",
        "followedArtists": "followers"
    };
    filter[filterKeys[listType]] = uid;
    userModel.findUserById(uid)
        .then(function (user) {
            if ((user.roles.indexOf('ARTIST') > -1 && listType !== 'followers') ||
                (user.roles.indexOf('CURATOR') > -1 && listType === 'followers')) {
                res.sendStatus(404);
            } else {
                userModel.filterUsers(filter)
                    .then(function (users) {
                        res.json(users);
                    });
            }
        });
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
        .then(function () {
            if (req.user.roles.indexof('ARTIST') === -1) {
                collectionModel.findCollectionsForOwner(uid)
                    .then(function (collections) {
                        for (var ii in collections) {
                            userModel.removeCollectionFromAllUsers(collections[ii]._id);
                        }
                    })
            }
        })
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