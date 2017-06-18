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

        function createWebsite(form) {
            if (form.$invalid) {
                return;
            }

            var website = {
                name: form.name,
                description: form.description
            };

            websiteService.createWebsite(website)
                .then(function () {
                    $location.url('/website');
                });
        }
    }
})();