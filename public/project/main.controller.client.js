/**
 * Created by alexisbrooks on 6/21/17.
 */
(function () {
    angular
        .module('project')
        .controller('mainController', mainController);

    function mainController($location, userService) {
        var vm = this;
        vm.search = search;
        vm.logout = logout;

        function init() {
            userService.isLoggedIn()
                .then(function (user) {
                    if (user === '0') {
                        vm.user = {};
                    } else {
                        vm.user = user;
                        vm.isCurator = user.roles.indexOf('CURATOR') > -1;
                    }
                })
        }
        init();

        function search(searchForm) {
            if (searchForm.$invalid) {
                return;
            }
            $location.url('/search?searchType=' + form.searchType + '&keyword=' + form.searchText);
        }

        function logout() {
            var rootUrl = 'localhost:3000'; //process.env.ROOT_URL;
            window.location.href = rootUrl + '/project/index.html#!/home';
            userService.logout();
            window.location.reload();
        }
    }

})();