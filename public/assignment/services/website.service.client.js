/**
 * Created by alexisbrooks on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);

    function websiteService($http) {

        var rootUrl1 = '/api/assignment/user/';
        var rootUrl2 = '/api/assignment/website/';

        return {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };


        function createWebsite(uid, website) {
            var url = rootUrl1 + uid + '/website';
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWebsitesByUser(uid) {
            var url = rootUrl1 + uid + '/website';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWebsiteById(websiteId) {
            var url = rootUrl2 + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateWebsite(websiteId, website) {
            var url = rootUrl2 + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response;
                })
        }

        function deleteWebsite(websiteId) {
            var url = rootUrl2 + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response;
                })
        }
    }

})();