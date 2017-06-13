/**
 * Created by alexisbrooks on 6/7/17.
 */
var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var pageModel = require('../page/page.model.server');

var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsites = deleteWebsites;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;

module.exports = websiteModel;

function createWebsite(uid, website) {
    website._user = uid;
    return websiteModel.create(website);
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
            description: website.descritpion,
            lastUpdated: Date.now()
        }
    })
}

function deleteWebsites(websiteIds) {
    return pageModel.find({_website: {$in: websiteIds }})
        .then(function (pages) {
            var pageIds = [];
            pages.forEach(function (page) {
                pageIds.push(page._id);
            });

            return pageModel.deletePages(pageIds)
                .then(function() {
                    return websiteModel.remove({_id: { $in: websiteIds }})
                })
    })
}

function addPage(wid, pid) {
    return websiteModel.findOne({_id: wid})
        .then(function (website) {
            website.pages.push(pid);
            return website.save();
        })
}

function removePage(wid, pid) {
    return websiteModel.update({_id: wid}, {
        $pull: {pages: pid}
    })
}