const app = require('../express');

app.get('/blah/something/blah', function (req, res) {
    // res.send('hello');
    res.render('lectures/hello.ejs');
});