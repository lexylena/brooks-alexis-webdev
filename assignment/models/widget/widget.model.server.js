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
        .sort({order: 1})
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

function reorderWidget(pid, start, end) {
    return widgetModel.find({_page: pid})
        .sort({order: 1})
        .then(function (widgets) {
            console.log('initial widget ordering before moving '+start+' to '+end);
            console.log(widgets);
            var movedWgid = widgets[start]._id;
            if (start < end) { // moving up the list
                return widgetModel.update({_page: pid, order: { $gt: end - 1, $lt: start + 1 }},
                    {$inc: { order: 1 }})
                    .then(function (status) {
                        return widgetModel.update({_id: movedWgid}, {order: end})
                            .then(function () {
                                widgetModel.find({_page: pid}).sort({order: 1})
                                    .then(function (widgets) {
                                        console.log('widgets after reordering');
                                        console.log(widgets);
                                    })
                            })
                    })
            } else { // moving down the list
                return widgetModel.update({_page: pid, order: { $gt: start - 1, $lt: end + 1 }},
                    {$inc: {order: -1}})
                    .then(function (status) {
                        return widgetModel.update({_id: movedWgid}, {order: end})
                            .then(function () {
                                widgetModel.find({_page: pid}).sort({order: 1})
                                    .then(function (widgets) {
                                        console.log('widgets after reordering');
                                        console.log(widgets);
                                    })
                            })
                    })
            }
        })
}