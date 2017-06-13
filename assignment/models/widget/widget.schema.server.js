/**
 * Created by alexisbrooks on 6/9/17.
 */
var mongoose = require('mongoose');
var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.Types.ObjectId, ref: "PageModel"},
    widgetType: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'], required: true},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    flickrUrl: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now},
    order: {type: Number, required: true}
}, {collection: "widget"});

module.exports = widgetSchema;