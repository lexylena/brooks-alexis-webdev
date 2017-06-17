/**
 * Created by alexisbrooks on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);

    function websiteService($http) {

        var baseUrl ='/api/assignment/website';

        return {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            checkWebsiteDeveloper: checkWebsiteDeveloper
        };


        function createWebsite(website) {
            return $http.post(baseUrl, website)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWebsitesByUser() {
            return $http.get(baseUrl)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWebsiteById(websiteId) {
            var url = baseUrl + '/' +  websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateWebsite(websiteId, website) {
            var url = baseUrl + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response;
                })
        }

        function deleteWebsite(websiteId) {
            var url = baseUrl + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response;
                })
        }

        function checkWebsiteDeveloper(websiteId) {
            var url = '/api/assignment/checkWebsiteDeveloper?wid=' + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }

})();