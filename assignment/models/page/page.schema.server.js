/**
 * Created by alexisbrooks on 6/9/17.
 */
var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.ObjectId, ref: "WebsiteModel"},
    name: {type: String, required: true},
    title: String,
    description: String,
    widgets: [{type: mongoose.Schema.ObjectId, ref: "PageModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "page"});

module.exports(pageSchema);