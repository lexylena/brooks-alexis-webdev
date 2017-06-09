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
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pid, widget) {
    return widgetModel.create(widget);
}

function findAllWidgetsForPage(pid) {
    return widgetModel
        .find({_page: pid})
        .populate('_page', 'pid')
        .exec();
}

function findWidgetById(wgid) {
    return widgetModel.find({_id: wgid});
}

function updateWidget(wgid, widget) {
    return widgetModel.update({_id: wgid}, {
        $set: {
            name: widget.name,
            text: widget.text,
            description: widget.description,
            url: widget.url,
            width: widget.width,
            height: widget.height,
            rows: widget.rows,
            size: widget.size,
            class: widget.class,
            icon: widget.icon,
            deletable: widget.deletable,
            formatted: widget.formatted
        }
    })
}

function deleteWidget(wgid) {
    return widgetModel.remove({_id: wgid});
}

function reorderWidget(pid, start, end) {

}