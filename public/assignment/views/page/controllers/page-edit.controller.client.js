/**
 * Created by alexisbrooks on 5/27/17.
 */
(function() {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($location, $routeParams, pageService) {

        var vm = this;

        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];

        function init() {
            pageService.findPageByWebsiteId(vm.wid)
                .then(function (pages) {
                    vm.pages = pages;
                });

            pageService.findPageById(vm.pid)
                .then(function (page) {
                    vm.cur = page;
                });
        }

        init();

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage() {
            if (vm.cur.name === "") {
                vm.error = 'Page name is required';
                return;
            }

            pageService.updatePage(vm.pid, vm.cur)
                .then(function (res) {
                    console.log(res.status);
                    $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page');
                })
        }

        function deletePage() {
            pageService.deletePage(vm.pid)
                .then(function (res) {
                    console.log(res.statusCode);
                    $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page');
                })
        }
    }
})();