/**
 * Created by alexisbrooks on 6/9/17.
 */
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');

var widgetModel = mongoose.model('WidgetModel', widgetSchema);
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.updateWidgetFlickrUrl = updateWidgetFlickrUrl;
widgetModel.deleteWidgets = deleteWidgets;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pid, widget) {
    widget._page = pid;
    return widgetModel.create(widget);
}

function findAllWidgetsForPage(pid) {
    return widgetModel
        .find({_page: pid})
        .populate('_page', 'pid')
        .exec();
}

function findWidgetById(wgid) {
    return widgetModel.findOne({_id: wgid});
}

function updateWidget(wgid, widget) {
    return widgetModel.update({_id: wgid}, widget);
}

function updateWidgetFlickrUrl(wgid, flickrUrl) {
    return widgetModel.update({_id: wgid}, {flickrUrl: flickrUrl});
}

function deleteWidgets(widgetIds) {
    return widgetModel.remove({_id: { $in: widgetIds }});
}

function reorderWidget(pid, initialIdx, finalIdx) {
    return widgetModel.findOne({_page: pid, order: initialIdx})
        .then(function (movingWidget) {
            var increment, lowerBound, upperBound;
            if (initialIdx > finalIdx) {
                increment = 1;
                lowerBound = finalIdx - 1;
                upperBound = initialIdx + 1;
            } else {
                increment = -1;
                lowerBound = initialIdx - 1;
                upperBound = finalIdx + 1;
            }
            return widgetModel.updateMany({_page: pid, order: {$gt: lowerBound, $lt: upperBound}},
                {$inc: {order: increment}
            })
                .then(function (status) {
                    return widgetModel.update({_id: movingWidget._id}, {$set: {order: finalIdx}});
                })
        })
}