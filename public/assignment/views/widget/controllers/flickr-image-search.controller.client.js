/**
 * Created by alexisbrooks on 6/4/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('flickrImageSearchController', flickrImageSearchController);

    function flickrImageSearchController(flickrService, $location, $routeParams) {
        var vm = this;
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];
        vm.wgid = $routeParams['wgid'];

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;
        vm.saveSelected = saveSelected;


        function selectPhoto(photo) {
            vm.photo = photo;
        }

        function saveSelected() {
            if (!vm.photo) {
                vm.error = "Please select a photo";
                return;
            }

            var selected = {
                url: "https://farm" + vm.photo.farm + ".staticflickr.com/" + vm.photo.server +
                        "/" + vm.photo.id + "_" + vm.photo.secret + "_s.jpg"
            };
            flickrService.updateWidgetUrl(vm.wgid, selected)
                .then(function () {
                    $location.url('/website/'+vm.wid+'/page/'+vm.pid+'/widget/'+vm.wgid);
                })
        }

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }
    }
})();