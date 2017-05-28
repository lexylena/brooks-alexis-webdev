/**
 * Created by alexisbrooks on 5/28/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams, $location, $sce, widgetService) { // strict contextual escaping

        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];
        vm.wgid = $routeParams['wgid'];

        function init() {
            vm.cur = widgetService.findWidgetById(vm.wgid);
            if (vm.wgid === '0000') {
                vm.isNew = true;
                vm.btnSave = 'Create Widget';
            } else {
                vm.btnSave = 'Save Changes';
            }

            vm.title = vm.cur.widgetType.toLowerCase() + ' Widget';
            vm.title = vm.cur.widgetType.charAt(0).toUpperCase() + vm.title.slice(1);
            if (vm.isNew) {
                vm.title = 'New ' + vm.title;
            } else {
                vm.title += ' Editor';
            }
        }

        init();

        vm.deleteWidget = deleteWidget;
        vm.saveWidget = saveWidget;
        vm.navBack = navBack;

        function deleteWidget() {
            widgetService.deleteWidget(vm.wgid);
            $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget');
        }

        function saveWidget() {
            if (vm.isNew) {
                vm.cur._id = (new Date()).getTime() + "";
            }

            widgetService.updateWidget(vm.wgid, vm.cur);
        }

        function navBack() {
            if (vm.isNew) {
                // navigate back to widget chooser without creating new widget
                widgetService.deleteWidget(vm.wgid);
                $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget/new');
            } else {
                // navigate back to widget list
                $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget');
            }
        }
    }
    
})();