/**
 * Created by alexisbrooks on 6/4/17.
 */
var app = require('../../express');
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
var widgetModel = require('../models/widget/widget.model.server');
var pageModel = require('../models/page/page.model.server');

app.post('/api/assignment/upload', upload.single('myFile'), uploadImage);
app.post('/api/assignment/page/:pid/widget', createWidget);
app.get('/api/assignment/page/:pid/widget', findWidgetsByPageId);
app.get('/api/assignment/widget/:wgid', findWidgetById);
app.put('/api/assignment/widget/:wgid', updateWidget);
app.delete('/api/assignment/widget/:wgid', deleteWidget);
app.put('/api/assignment/widget/:wgid/flickr', updateWidgetFlickrUrl);
app.put('/api/assignment/page/:pid/widget', updateOrder);

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100", "name": null, "text": null,
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100", "name": null, "text": null,
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

function uploadImage(req, res) {
    var wgid   = req.body.wgid;
    var width  = req.body.width;
    var myFile = req.file;

    var uid = req.body.uid;
    var wid = req.body.wid;
    var pid = req.body.pid;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;
    
    widgetModel.findWidgetById(wgid)
        .then(function (widget) {
            widget.url = '/assignment/uploads/' + filename;
            widgetModel.updateWidget(wgid, widget)
                .then(function (status) {
                    var callbackUrl   = "/assignment/index.html#!/user/" + uid + "/website/" +
                        wid + "/page/" + pid + "/widget/" + wgid;

                    res.redirect(callbackUrl);
                })
        })
}

function createWidget(req, res) {
    var pid = req.params['pid'];
    var widget = req.body;
    widgetModel.findAllWidgetsForPage(pid)
        .then(function (widgets) {
            widget.order = widgets.length;
            widgetModel.createWidget(pid, widget)
                .then(function (widget) {
                    pageModel.addWidget(pid, widget._id)
                        .then(function () {
                            res.json(widget);
                        })
                })
        })
}

function findWidgetsByPageId(req, res) {
    var pid = req.params['pid'];
    widgetModel.findAllWidgetsForPage(pid)
        .then(function (widgets) {
            res.json(widgets);
        })
}

function findWidgetById(req, res) {
    var wgid = req.params['wgid'];
    widgetModel.findWidgetById(wgid)
        .then(function (widget) {
            res.json(widget);
        })
}

function updateWidget(req, res) {
    var widget = req.body;
    var wgid = req.params['wgid'];

    if (widget.flickrUrl) { // a flickr image has been selected, so save that url
        widget.url = widget.flickrUrl;
        widget.flickrUrl = null;
    }

    widgetModel.updateWidget(wgid, widget)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        })
}

function deleteWidget(req, res) {
    var wgid = req.params['wgid'];
    widgetModel.findWidgetById(wgid)
        .then(function (widget) {
            var pid = widget._page;
            widgetModel.deleteWidgets([wgid])
                .then(function(status) {
                    pageModel.removeWidget(pid, wgid)
                        .then(function () {
                            res.sendStatus(200);
                        })
                }, function (err) {
                    res.sendStatus(404);
                })
        })
}

function updateWidgetFlickrUrl(req, res) {
    var wgid = req.params['wgid'];
    var flickrUrl = req.body['url'];
    widgetModel.updateWidgetFlickrUrl(wgid, flickrUrl)
        .then(function (status) {
            res.sendStatus(200);
        })
}

function updateOrder(req, res) {
    var initialIdx = parseInt(req.query['initial'].replace('index', ''));
    var finalIdx = parseInt(req.query['final'].replace('index', ''));
    var pid = req.params['pid'];
    widgetModel.reorderWidget(pid, initialIdx, finalIdx)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        })
}