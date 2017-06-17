/**
 * Created by alexisbrooks on 5/27/17.
 */
(function() {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($location, currentUser, websiteService) {

        var vm = this;

        vm.uid = currentUser._id;

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
            websiteService.createWebsite(website)
                .then(function () {
                    $location.url('/website');
                });
        }
    }
})();