/**
 * Created by alexisbrooks on 5/27/17.
 */
(function() {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($routeParams, pageService) {

        var vm = this;

        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];

        function init() {
            pageService.findPageByWebsiteId(vm.wid)
                .then(function (pages) {
                    vm.pages = pages;
                })
        }

        init();
    }
})();