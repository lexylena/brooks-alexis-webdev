/**
 * Created by alexisbrooks on 6/9/17.
 */
var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');

var pageModel = mongoose.model('PageModel', pageSchema);
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(wid, page) {
    return pageModel.create(page);
}

function findAllPagesForWebsite(wid) {
    return pageModel
        .find({_website: wid})
        .populate('_website', 'wid')
        .exec();
}

function findPageById(pid) {
    return pageModel.findOne({_id: pid});
}

function updatePage(pid, page) {
    return pageModel.update({_id: pid}, {
        $set: {
            name: page.name,
            title: page.title,
            description: page.description
        }
    })
}

function deletePage(pid) {
    return pageModel.remove({_id: pid});
}