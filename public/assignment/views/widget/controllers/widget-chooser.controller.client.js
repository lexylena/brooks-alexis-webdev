/**
 * Created by alexisbrooks on 5/28/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('widgetChooserController', widgetChooserController);

    function widgetChooserController($routeParams, $location, widgetService) { // strict contextual escaping

        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];

        var editUrl = '/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget/0000';
        
        vm.newWidget = newWidget;

        function newWidget(type) {
            var widget;

            if (type === 'heading') {
                widget = { "_id": "0000", "widgetType": "HEADING", "pageId": vm.pid, "size": "1", "text": null};
            } else if (type === 'image') {
                widget = { "_id": "0000", "widgetType": "IMAGE", "pageId": vm.pid, "width": "100%",
                    "url": null};
            } else if (type === 'youtube') {
                widget = { "_id": "0000", "widgetType": "YOUTUBE", "pageId": vm.pid, "width": "100%",
                    "url": null};
            } else {
                return null;
            }

            widgetService.createWidget(vm.pid, widget);
            $location.url(editUrl);
        }
    }

})();