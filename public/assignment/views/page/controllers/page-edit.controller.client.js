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
            vm.pages = pageService.findPageByWebsiteId(vm.wid);
            vm.cur = pageService.findPageById(vm.pid);
        }

        init();

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage() {
            pageService.updatePage(vm.pid, vm.cur);
            $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page');
        }

        function deletePage() {
            pageService.deletePage(vm.pid);
            $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page');
        }
    }
})();