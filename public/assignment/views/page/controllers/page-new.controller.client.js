/**
 * Created by alexisbrooks on 5/27/17.
 */
(function() {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($location, $routeParams, pageService) {

        var vm = this;

        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];

        function init() {
            vm.pages = pageService.findPageByWebsiteId(vm.wid);
        }

        init();

        vm.createPage = createPage;

        function createPage(page) {
            pageService.createPage(vm.wid, page);
            $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page');
        }
    }
})();