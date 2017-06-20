/**
 * Created by alexisbrooks on 6/19/17.
 */
const app = require('../../../express');

app.get('/lectures/ejs/crud/user', getUserList);
var userModel = require('../../../assignment/models/user/user.model.server');

function getUserList(req, res) {
    userModel.findAllUsers()
        .then(function (users) {
            var scope = {users: users};
            res.render('lectures/ejs/crud/user', scope);
        });
}