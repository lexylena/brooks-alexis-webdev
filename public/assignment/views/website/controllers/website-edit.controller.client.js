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
            vm.websites = websiteService.findWebsitesByUser(vm.uid);
            vm.cur = websiteService.findWebsiteById(vm.wid);
        }

        init();

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite() {
            websiteService.updateWebsite(vm.wid, vm.cur);
            if (vm.cur.name === "") {
                vm.error = 'Website Name is required';
                return;
            }
            var updated = websiteService.findWebsiteById(vm.wid);
            console.log(updated);
            $location.url('/user/' + vm.uid + '/website');
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(vm.wid);
            $location.url('/user/' + vm.uid + '/website');
        }
    }
})();