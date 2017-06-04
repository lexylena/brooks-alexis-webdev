/**
 * Created by alexisbrooks on 5/24/17.
 */
(function() {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {

        var vm = this;

        vm.uid = $routeParams['uid'];

        websiteService.findWebsitesByUser(vm.uid)
            .then(function (websites) {
                vm.websites = websites;
            });
    }
})();