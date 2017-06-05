/**
 * Created by alexisbrooks on 5/25/17.
 */
(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);

    function widgetService($http) {

        var rootUrl = '/api/assignment/';

        return {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };

        function createWidget(pid, widget) {
            var url = rootUrl + 'page/' + pid + '/widget';
            return $http.post(url, widget)
                .then(function (response) {
                    return response;
                })
        }

        function findWidgetsByPageId(pid) {
            var url = rootUrl + 'page/' + pid + '/widget';
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWidgetById(wgid) {
            var url = rootUrl + 'widget/' + wgid;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateWidget(wgid, widget) {
            var url = rootUrl + 'widget/' + wgid;
            return $http.put(url, widget)
                .then(function (response) {
                    return response;
                })
        }

        function deleteWidget(wgid) {
            var url = rootUrl + 'widget/' + wgid;
            return $http.delete(url)
                .then(function (response) {
                    return response;
                })
        }
    }
})();