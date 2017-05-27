/**
 * Created by alexisbrooks on 5/27/17.
 */
(function() {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($location, $routeParams, websiteService) {

        var vm = this;

        vm.uid = $routeParams['uid'];

        function init() {
            vm.websites = websiteService.findWebsitesByUser(vm.uid);
        }

        init();

        vm.createWebsite = createWebsite;

        function createWebsite(website) {
            websiteService.createWebsite(vm.uid, website);
            $location.url('/user/' + vm.uid + '/website');
        }
    }
})();