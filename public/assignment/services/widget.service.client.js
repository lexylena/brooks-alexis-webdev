/**
 * Created by alexisbrooks on 5/25/17.
 */
(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);

    function widgetService($http) {

        var baseUrl = '/api/assignment/';

        return {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            updateOrder: updateOrder,
            checkWidgetDeveloper: checkWidgetDeveloper
        };

        function createWidget(pid, widget) {
            var url = baseUrl + 'page/' + pid + '/widget';
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWidgetsByPageId(pid) {
            var url = baseUrl + 'page/' + pid + '/widget';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWidgetById(wgid) {
            var url = baseUrl + 'widget/' + wgid;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateWidget(wgid, widget) {
            var url = baseUrl + 'widget/' + wgid;
            return $http.put(url, widget)
                .then(function (response) {
                    return response;
                })
        }

        function deleteWidget(wgid) {
            var url = baseUrl + 'widget/' + wgid;
            return $http.delete(url)
                .then(function (response) {
                    return response;
                })
        }

        function updateOrder(pid, initialIdx, finalIdx) {
            var url = baseUrl + 'page/' + pid + '/widget?initial=index'
                + initialIdx + '&final=index' + finalIdx;
            return $http.put(url, {}) // don't technically need any "put" info for request body
                .then(function (response) {
                    return response;
                })
        }

        function checkWidgetDeveloper(wgid) {
            var url = baseUrl + 'checkWidgetDeveloper?wgid=' + wgid;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();