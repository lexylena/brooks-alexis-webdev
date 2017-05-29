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
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},


            { "_id": "1001", "widgetType": "HEADING", "pageId": "654", "size": 1, "text": "GIZMODO"},
            { "_id": "1002", "widgetType": "HEADING", "pageId": "654", "size": 3,
                "text": "This Post About Dog Pee Will Change Your Life"},
            { "_id": "1003", "widgetType": "IMAGE", "pageId": "654", "width": "100",
                "url": "https://i.kinja-img.com/gawker-media/image/upload/b2henoqpiskqg0ar0cbz.jpg"},
            { "_id": "1004", "widgetType": "HTML", "pageId": "654",
                "text": '<p>Eyes away from whatever you’re looking at. No need to keep reading stressful,\
                news about our President, fidget spinners, stuff dying, any of that.<br></p>\
                <p>You like dogs, right? Good. Let’s talk about dogs. What about them? I don’t know, let’s \
                talk about their pee. Ands their butts, sure.</p> \
                <p>Did you think pee was sterile? I \
                <a href="http://gizmodo.com/scientists-have-a-sneaky-way-of-telling-if-you-peed-in-1792858782#_ga=2.227158745.574704394.1495053146-1938281629.1482352286" rel="nofollow">used to</a> \
                think that. It’s not. In fact, pee (specifically dog pee, that’s what we’re talking \
                about right now) has a zoo of bacteria living in it, much like poop and skin have \
                lots of bacteria living in them. In fact, there are more species in dog pee than \
                either dog butts or dog genitalia.</p>'},
            { "_id": "1005", "widgetType": "HEADING", "pageId": "654", "size": 1, "text": "TED Talks"},
            { "_id": "1006", "widgetType": "HEADING", "pageId": "654", "size": 2,
                "text": "The future we're building -- and boring"},
            { "_id": "1007", "widgetType": "YOUTUBE", "pageId": "654", "width": "100",
                "url": "https://youtu.be/zIwLWfaAg-8" },
            { "_id": "1008", "widgetType": "HTML", "pageId": "654",
                "text": '<p>Elon Musk discusses his new project digging tunnels under\
                         LA, the latest from Tesla and SpaceX and his motivation for \
                         building a future on Mars in conversation with TED\'s Head Curator,\
                         Chris Anderson.<br><br>The TED Talks channel features the best \
                         talks and performances from the TED Conference, where the world\'s \
                         leading thinkers and doers give the talk of their lives in 18 minutes \
                         (or less). Look for talks on Technology, Entertainment and Design -- \
                         plus science, business, global issues, the arts and more.</p>'}
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