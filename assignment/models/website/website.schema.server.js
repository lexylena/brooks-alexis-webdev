/**
 * Created by alexisbrooks on 6/6/17.
 */
var mongoose = require('mongoose');
var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"}, // acts like foreign key, refers to user model
    name: {type: string, require: true},
    description: {type: String},
    pages: [{type: mongoose.Schema.ObjectId, ref: "PageModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "website"});

module.exports(websiteSchema);