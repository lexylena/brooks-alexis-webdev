/**
 * Created by alexisbrooks on 5/22/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, userService, $routeParams) {

        var model = this;
        var userId = $routeParams['uid'];

        model.user = userService.findUserById(userId);
        model.updateUser = updateUser;

        function updateUser(password, password2) {
            if (password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            model.user['password'] = password;
            console.log('updating user to...');
            console.log(model.user);
            userService.updateUser(userId, model.user);
            model.error = null;
        }
    }
})();