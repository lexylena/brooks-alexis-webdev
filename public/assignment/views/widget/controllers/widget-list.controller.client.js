/**
 * Created by alexisbrooks on 5/25/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($routeParams, $location, $sce, widgetService) { // strict contextual escaping

        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];

        function init() {
            vm.widgets = widgetService.findWidgetsByPageId(vm.pid);
        }

        init();

        vm.trustThisContent = trustThisContent;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;

        function trustThisContent(html) {
            // diligence to scrub any unsafe content; some libraries to pass it through to do that...
            // for now just assuming...
            return $sce.trustAsHtml(html); // returns signed content that says this html is safe
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var arr = youTubeLink.split('/');
            embedUrl += arr[arr.length - 1];
            console.log(embedUrl);
            return $sce.trustAsResourceUrl(embedUrl);
        }
    }
})();