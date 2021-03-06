/**
 * Created by alexisbrooks on 6/6/17.
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema( {
    username: {type: String, require: true},
    password: {type: String, require: true},
    roles: [{type: String, default: 'USER', enum: ['USER', 'ADMIN']}],
    google: {
        id: String,
        token: String
    },
    firstName: String,
    lastName: String,
    email: {type: String, require: true},
    phone: String,
    dateCreated: {type: Date, default: Date.now},
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}]
}, {collection: "assignment_user"});

module.exports = userSchema;