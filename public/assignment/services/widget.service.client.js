/**
 * Created by alexisbrooks on 5/25/17.
 */
(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);

    function widgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        return {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };

        function createWidget(pid, widget) {
            widgets.push(widget);
        }

        function findWidgetsByPageId(pid) {
            var resultSet = [];
            for (var w in widgets) {
                if (widgets[w].pageId === pid) {
                    resultSet.push(widgets[w]);
                }
            }

            return resultSet;
        }

        function findWidgetById(wgid) {
            return widgets.find(function (widget) {
                return widget._id === wgid;
            });
        }

        function updateWidget(wgid, widget) {
            var update = findWidgetById(wgid);

            Object.keys(update).forEach(function (key) {
                update[key] = widget[key];
            });
        }

        function deleteWidget(wgid) {
            var deleted = findWidgetById(wgid);
            var index = widgets.indexOf(deleted);
            widgets.splice(index, 1);
        }
    }
})();