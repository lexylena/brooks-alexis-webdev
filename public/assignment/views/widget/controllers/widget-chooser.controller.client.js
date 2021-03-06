/**
 * Created by alexisbrooks on 5/28/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('widgetChooserController', widgetChooserController);

    function widgetChooserController($routeParams, $location, widgetService) { // strict contextual escaping

        var vm = this;
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];

        var editUrl = '/website/' + vm.wid + '/page/' + vm.pid + '/widget/';
        
        vm.newWidget = newWidget;

        function newWidget(type) {
            var widget;

            if (type === 'heading') {
                widget = { "widgetType": "HEADING", "size": "1"};
            } else if (type === 'image') {
                widget = { "widgetType": "IMAGE", "width": 100};
            } else if (type === 'youtube') {
                widget = {"widgetType": "YOUTUBE", "width": 100}
            } else if (type === 'html') {
                widget = {"widgetType": "HTML"}
            } else if (type === 'text') {
                widget = {"widgetType": "TEXT"}
            } else {
                return null;
            }

            widgetService.createWidget(vm.pid, widget)
                .then(function (widget) {
                            $location.url(editUrl+widget._id);
                        })
        }
    }

})();