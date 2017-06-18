/**
 * Created by alexisbrooks on 5/28/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams, $location, widgetService, flickrService) { // strict contextual escaping

        var vm = this;
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];
        vm.wgid = $routeParams['wgid'];
        vm.options = [{value: 1, text: '1 (largest)'}, {value: 2, text: '2'},
            {value: 3, text: '3'}, {value: 4, text: '4'}, {value: 5, text: '5'},
            {value: 6, text: '6 (smallest)'}];

        function init() {
            widgetService.findWidgetById(vm.wgid)
                .then(function (widget) {
                    vm.cur = widget;

                    if (!widget.name) {
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
                });
        }
        init();

        vm.deleteWidget = deleteWidget;
        vm.saveWidget = saveWidget;
        vm.navBack = navBack;

        function deleteWidget() {
            widgetService.deleteWidget(vm.wgid)
                .then(function () {
                    $location.url('/website/' + vm.wid + '/page/' + vm.pid + '/widget');
                })
        }

        function saveWidget(form) {
            if (form.$invalid) {
                return;
            }

            if (!vm.cur.url && !vm.cur.flickrUrl && vm.cur.widgetType === 'IMAGE') {
                vm.error = 'URL is required';
                return;
            }

            if (vm.cur.widgetType === 'HTML' && !vm.cur.text) {
                vm.error = 'HTML is required';
                return;
            }

            widgetService.updateWidget(vm.wgid, vm.cur)
                .then(function () {
                    $location.url('/website/' + vm.wid + '/page/' + vm.pid + '/widget');
                })
        }

        function navBack() {
            if (vm.isNew) {
                // navigate back to widget chooser without creating new widget
                widgetService.deleteWidget(vm.wgid)
                    .then(function () {
                        $location.url('/website/' + vm.wid + '/page/' + vm.pid + '/widget/new');
                    })
            } else {
                if (vm.cur.flickrUrl) {
                    flickrService.updateWidgetUrl(vm.wgid, {url: null})
                        .then(function (response) {

                        })
                }
                // navigate back to widget list
                $location.url('/website/' + vm.wid + '/page/' + vm.pid + '/widget');
            }
        }
    }
    
})();