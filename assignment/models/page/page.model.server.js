/**
 * Created by alexisbrooks on 6/9/17.
 */
var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var widgetModel = require('../widget/widget.model.server');

var pageModel = mongoose.model('PageModel', pageSchema);
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.addWidget = addWidget;
pageModel.removeWidget = removeWidget;
pageModel.deletePages = deletePages;

module.exports = pageModel;

function createPage(wid, page) {
    page._website = wid;
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
            description: page.description,
            lastUpdated: Date.now()
        }
    })
}

function addWidget(pid, wgid) {
    return pageModel.findOne({_id: pid})
        .then(function (page) {
            page.widgets.push(wgid);
            return page.save();
        })
}

function removeWidget(pid, wgid) {
    return pageModel.update({_id: pid}, {
        $pull: {widgets: wgid}
    })
}

function deletePages(pageIds) {
    return widgetModel.find({_page: { $in: pageIds }})
        .then(function (widgets) {
            var widgetIds = [];
            widgets.forEach(function (widget) {
                widgetIds.push(widget._id);
            });

            return widgetModel.deleteWidgets(widgetIds)
                .then(function() {
                    return pageModel.remove({_id: { $in: pageIds }})
                })
        })
}