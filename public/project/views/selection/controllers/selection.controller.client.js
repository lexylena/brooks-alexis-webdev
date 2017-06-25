/**
 * Created by alexisbrooks on 6/21/17.
 */
(function () {
    angular
        .module('project')
        .controller('selectionController', selectionController);

    function selectionController($routeParams, $location, currentUser, collectionService,
                                 selectionService, artworkService, harvardArtMuseumService,
                                 commentService, userService) {

        var vm = this;
        vm.user = currentUser;

        vm.curatorId = $routeParams['curatorId'];
        vm.collectionId = $routeParams['collectionId'];
        vm.selectionId = $routeParams['selectionId'];

        vm.changeCurrentImage = changeCurrentImage;
        vm.updateSelection = updateSelection;
        vm.deleteSelection = deleteSelection;
        vm.addComment = addComment;
        vm.deleteComment = deleteComment;

        function init() {
            collectionService.findCollectionById(vm.collectionId)
                .then(function (collection) {
                    vm.collection = collection;
                });

            commentService.findCommentsForSelection(vm.selectionId)
                .then(function (comments) {
                    vm.comments = comments;
                });

            selectionService.findSelectionById(vm.selectionId)
                .then(function (selection) {
                    vm.selection = selection;
                    vm.currentImage = selection.meta.primaryImageUrl;

                    userService.findUserById(vm.selection._curator)
                        .then(function (user) {
                            vm.selectionCurator = user;
                        });

                    var service = artworkService;
                    vm.artworkId = selection._artwork;
                    if (selection.hamArtworkId) {
                        service = harvardArtMuseumService;
                        vm.artworkId = selection.hamArtworkId.substring(4);
                    }

                    service.findArtworkById(vm.artworkId)
                        .then(function (artwork) {
                            vm.artwork = artwork;
                        });
                });
        }
        init();

        function changeCurrentImage(image) {
            vm.currentImage = image;
        }

        function updateSelection(form) {

        }

        function deleteSelection() {

        }

        function addComment(form) {

        }

        function deleteComment(comment) {

        }
    }

})();