/**
 * Created by alexisbrooks on 5/27/17.
 */

(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService($http) {

        var rootUrl1 = '/api/assignment/website/';
        var rootUrl2 = '/api/assignment/page/';

        return {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        function createPage(wid, page) {
            var url = rootUrl1 + wid + '/page';
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPageByWebsiteId(wid) {
            var url = rootUrl1 + wid + '/page';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPageById(pid) {
            var url = rootUrl2 + pid;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updatePage(pid, page) {
            var url = rootUrl2 + pid;
            return $http.put(url, page)
                .then(function (response) {
                    return response;
                })
        }

        function deletePage(pid) {
            var url = rootUrl2 + pid;
            return $http.delete(url)
                .then(function (response) {
                    return response;
                })
        }
    }
})();