/**
 * Created by alexisbrooks on 5/11/17.
 */

/*
run this from /server.js
no need for IFFE's on server side
variables only accessible within this file, unless explicitly made otherwise with module.exports
 */

// module.exports = {
//     message: 'hello',
//     sayHello: function() {
//         console.log('hello');
//     }
// };

// module.exports = function(message) {
//     console.log('message = ' + message);
// };


// route format = /api/entity/ (all)
// specific index ex: /api/entity/:index
module.exports = function(app) {

    var todos = [{title: "todo 1", details: "details 1"}, {title: "todo 2", details: "details 2"},
        {title: "todo 3", details: "details 3"}];

    app.get('/api/todo/', function(req, res) {
        res.json(todos);
    });

    app.get('/api/todo/:index', function(req, res) {
        var index = req.params.index;
        res.json(todos[index]);
    });

    app.delete('/api/todo/:index', function(req, res) {
        var index = req.params['index']; // preferable? more powerful than above syntax
        todos.splice(index, 1);
        res.json(todos);
    });
};