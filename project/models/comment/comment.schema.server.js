/**
 * Created by alexisbrooks on 6/13/17.
 */
var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'PUserModel', required: true},
    _selection: {type: mongoose.Schema.Types.ObjectId, ref: 'SelectionModel', required: true},
    createdDate: {type: Date, default: Date.now},
    text: {type: String, required: true},
    meta: {
        user: {
            displayName: {type: String, required: true},
            profileImageUrl: {type: String, required: true}
        }
    }

}, {comment: "comment"});

module.exports = commentSchema;