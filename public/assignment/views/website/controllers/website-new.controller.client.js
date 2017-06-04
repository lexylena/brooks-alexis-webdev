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
            websiteService.findWebsitesByUser(vm.uid)
                .then(function (websites) {
                    vm.websites = websites;
                })
        }

        init();

        vm.createWebsite = createWebsite;

        function createWebsite(website) {
            if (website === undefined || website.name === undefined || website.name === "") {
                vm.error = 'Website name is required';
                return;
            }
            websiteService.createWebsite(vm.uid, website)
                .then(function () {
                    $location.url('/user/' + vm.uid + '/website');
                });
        }
    }
})();