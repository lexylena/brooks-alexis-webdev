/**
 * Created by alexisbrooks on 6/20/17.
 */
module.exports = function (application) {
  var app = require('../../express');

  app.get('/wam/index.html', indexHtml);
  app.get('/wam/app.js', appJs);
  app.get('/wam/:entityName/templates/:type/:templateName', templatesHtml);
  app.get('/wam/:entityName/controllers/:type/:fileName', controllersJs);



    function indexHtml(req, res) {
      res.render('lectures/wam/index', application);
  }

  function appJs(req, res) {
      res.render('lectures/wam/appJs', application);
  }

  function templatesHtml(req, res) {
      var entityName = req.params.entityName;
      var type = req.params.type; // edit or list
      application.entityName = entityName;
      res.render('lectures/wam/templates/'+ type, application);
  }

    function controllersJs(req, res) {
        var entityName = req.params.entityName;
        var type = req.params.type; // edit or list
        application.entityName = entityName;
        res.render('lectures/wam/controllers/'+ type, application);
    }
};