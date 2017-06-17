/**
 * Created by alexisbrooks on 5/27/17.
 */
(function() {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($location, $routeParams, pageService) {

        var vm = this;

        vm.wid = $routeParams['wid'];

        function init() {
            pageService.findPageByWebsiteId(vm.wid)
                .then(function (pages) {
                    vm.pages = pages;
                })
        }

        init();

        vm.createPage = createPage;

        function createPage(page) {
            if (page === undefined || page.name === undefined || page.name === "") {
                vm.error = 'Page name is required';
                return;
            }
            pageService.createPage(vm.wid, page)
                .then(function () {
                    $location.url('/website/' + vm.wid + '/page');
                })
        }
    }
})();