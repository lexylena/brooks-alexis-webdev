/**
 * Created by alexisbrooks on 5/27/17.
 */

(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
            { "_id": "654", "name": "TestPage", "websiteId": "321", "description": "Lorem" }
        ];

        return {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        function createPage(wid, page) {
            var now = (new Date()).getTime() + "";
            page._id = now;
            page.websiteId = wid;
            page.created = now;
            page.updated = now;
            pages.push(page);
            return page._id;
        }

        function findPageByWebsiteId(wid) {
            var resultSet = [];
            for (var p in pages) {
                if (pages[p].websiteId === wid) {
                    resultSet.push(pages[p]);
                }
            }

            return resultSet;
        }

        function findPageById(pid) {
            return pages.find(function (page) {
                return page._id === pid;
            });
        }

        function updatePage(pid, page) {
            var update = findPageById(pid);

            Object.keys(page).forEach(function (key) {
                update[key] = page[key];
            });

            update.updated = (new Date()).getTime() + "";
        }

        function deletePage(pid) {
            var deleted = findPageById(pid);
            var index = pages.indexOf(deleted);
            pages.splice(index, 1);
        }
    }
})();