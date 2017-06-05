/**
 * Created by alexisbrooks on 6/5/17.
 */
(function () {
    angular
        .module('WAM')
        .service('flickrService', flickrService);

    function flickrService($http) {

        this.searchPhotos = searchPhotos;
        this.updateWidgetUrl = updateWidgetUrl;

        var key = "1f269183b1f69d9b2bf370a3754fb317";
        var secret = "55172be10a7f809b";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

        function updateWidgetUrl(wgid, selected) {
            return $http.put('/api/assignment/widget/' + wgid + '/flickr', selected)
                .then(function (response) {
                    return response;
                })
        }

    }
})();