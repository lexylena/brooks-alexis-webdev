/**
 * Created by alexisbrooks on 6/7/17.
 */
var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');

var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function createWebsite(uid, website) {
    //TODO: ? update user?
    websiteModel.create(website);
}

function findAllWebsitesForUser(uid) {
    return websiteModel
        .find({_user: uid})
        .populate('_user', 'uid')
        .exec();
}

function findWebsiteById(wid) {
    return websiteModel.findOne({_id: wid});
}

function updateWebsite(wid, website) {
    return websiteModel.update({_id: wid}, {
        $set: {
            name: website.name,
            description: website.descritpion
        }
    })
}

function deleteWebsite(wid) {
    return websiteModel.remove({_id: wid});
}