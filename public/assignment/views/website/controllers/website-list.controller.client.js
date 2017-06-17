/**
 * Created by alexisbrooks on 5/24/17.
 */
(function() {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController(currentUser, websiteService) {

        var vm = this;

        vm.uid = currentUser._id;

        websiteService.findWebsitesByUser(vm.uid)
            .then(function (websites) {
                vm.websites = websites;
            });
    }
})();