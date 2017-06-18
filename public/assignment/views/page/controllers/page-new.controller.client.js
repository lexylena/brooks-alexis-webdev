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

        function createPage(form) {
            if (form.$invalid) {
                return;
            }

            var page = {
                name: form.name,
                title: form.title
            };

            pageService.createPage(vm.wid, page)
                .then(function () {
                    $location.url('/website/' + vm.wid + '/page');
                })
        }
    }
})();