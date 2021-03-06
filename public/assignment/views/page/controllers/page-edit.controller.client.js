/**
 * Created by alexisbrooks on 5/27/17.
 */
(function() {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($location, $routeParams, pageService) {

        var vm = this;

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

        function updatePage(form) {
            if (form.$invalid) {
                return;
            }

            pageService.updatePage(vm.pid, vm.cur)
                .then(function (res) {
                    $location.url('/website/' + vm.wid + '/page');
                })
        }

        function deletePage() {
            pageService.deletePage(vm.pid)
                .then(function (res) {
                    $location.url('/website/' + vm.wid + '/page');
                })
        }
    }
})();