/**
 * Created by alexisbrooks on 5/27/17.
 */
(function() {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($location, $routeParams, currentUser, websiteService) {

        var vm = this;

        vm.uid = currentUser._id;
        vm.wid = $routeParams['wid'];

        function init() {
            websiteService.findWebsitesByUser(vm.uid)
                .then(function (websites) {
                    vm.websites = websites;
                });

            websiteService.findWebsiteById(vm.wid)
                .then(function (website) {
                    vm.cur = website;
                });
        }

        init();

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite() {
            if (vm.cur.name === "") {
                vm.error = 'Website Name is required';
                return;
            }
            websiteService.updateWebsite(vm.wid, vm.cur)
                .then(function () {
                    $location.url('/website');
                });
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(vm.wid)
                .then(function (res) {
                    $location.url('/website');
                })
        }
    }
})();