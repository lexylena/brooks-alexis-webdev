/**
 * Created by alexisbrooks on 5/27/17.
 */

(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService($http) {

        var baseUrl1 = '/api/assignment/website/';
        var baseUrl2 = '/api/assignment/page/';

        return {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage,
            checkPageDeveloper: checkPageDeveloper
        };

        function createPage(wid, page) {
            var url = baseUrl1 + wid + '/page';
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPageByWebsiteId(wid) {
            var url = baseUrl1 + wid + '/page';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPageById(pid) {
            var url = baseUrl2 + pid;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updatePage(pid, page) {
            var url = baseUrl2 + pid;
            return $http.put(url, page)
                .then(function (response) {
                    return response;
                })
        }

        function deletePage(pid) {
            var url = baseUrl2 + pid;
            return $http.delete(url)
                .then(function (response) {
                    return response;
                })
        }

        function checkPageDeveloper(pid) {
            var url = '/api/assignment/checkPageDeveloper?pid=' + pid;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();