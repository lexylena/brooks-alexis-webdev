/**
 * Created by alexisbrooks on 5/27/17.
 */
(function() {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($location, $routeParams, websiteService) {

        var vm = this;

        vm.uid = $routeParams['uid'];
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
                    // websiteService.findWebsiteById(vm.wid)
                    //     .then(function (website) {
                    //         console.log(website);
                    //     });

                    $location.url('/user/' + vm.uid + '/website');
                });
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(vm.wid)
                .then(function (res) {
                    console.log(res.status);
                    $location.url('/user/' + vm.uid + '/website');
                })
        }
    }
})();