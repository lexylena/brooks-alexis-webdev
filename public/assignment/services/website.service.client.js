/**
 * Created by alexisbrooks on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);

    function websiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        return {
          createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };


        function createWebsite(uid, website) {
            website._id = (new Date()).getTime() + "";
            website.developerId = uid;
            websites.push(website);
            return website._id;
        }

        function findWebsitesByUser(uid) {
            var resultSet = [];
            for (var w in websites) {
                if (websites[w].developerId === uid) {
                    resultSet.push(websites[w]);
                }
            }

            return resultSet;
        }

        function findWebsiteById(websiteId) {
            return websites.find(function (website) {
                return website._id === websiteId;
            });
        }

        function updateWebsite(websiteId, website) {
            var update = findWebsiteById(websiteId);

            Object.keys(update).forEach(function (key) {
                update[key] = website[key];
            });
        }

        function deleteWebsite(websiteId) {
            var deleted = findWebsiteById(websiteId);
            var index = websites.indexOf(deleted);
            websites.splice(index, 1);
        }
    }

})();