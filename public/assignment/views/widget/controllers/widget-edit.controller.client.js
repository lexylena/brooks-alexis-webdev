/**
 * Created by alexisbrooks on 5/28/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams, $location, widgetService, flickrService) { // strict contextual escaping

        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];
        vm.wgid = $routeParams['wgid'];

        function init() {
            widgetService.findWidgetById(vm.wgid)
                .then(function (widget) {
                    vm.cur = widget;

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
                });
        }

        init();

        vm.deleteWidget = deleteWidget;
        vm.saveWidget = saveWidget;
        vm.navBack = navBack;

        function deleteWidget() {
            widgetService.deleteWidget(vm.wgid)
                .then(function () {
                    $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget');
                })
        }

        function saveWidget() {
            if (vm.cur.url !== undefined) { // either image or youtube
                console.log('image or youtube');
                if ((!vm.cur.url && vm.cur.widgetType === 'YOUTUBE') ||
                    (!vm.cur.url && !vm.cur.flickrUrl && vm.cur.widgetType === 'IMAGE')) {
                    vm.error = 'URL is required';
                    return;
                }

                var width = parseInt(vm.cur.width);
                if (width < 0 || width > 100) {
                    vm.error = 'Please enter a width percentage between 0 and 100';
                    return;
                }
            }
            if (vm.cur.size !== undefined) { // heading widget
                console.log('heading widget');
                console.log(vm.cur.text);
                if (!vm.cur.text) {

                    vm.error = 'Heading Text is required';
                    return;
                }
            }

            if (vm.cur.widgetType === 'HTML' && !vm.cur.text) {
                console.log('html widget');
                vm.error = 'HTML is required';
                return;
            }

            widgetService.updateWidget(vm.wgid, vm.cur)
                .then(function () {
                    $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget');
                })
        }

        function navBack() {
            if (vm.isNew) {
                // navigate back to widget chooser without creating new widget
                widgetService.deleteWidget(vm.wgid)
                    .then(function () {
                        $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget/new');
                    })
            } else {
                if (vm.cur.flickrUrl) {
                    flickrService.updateWidgetUrl(vm.wgid, {url: null})
                        .then(function (response) {

                        })
                }
                // navigate back to widget list
                $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget');
            }
        }
    }
    
})();