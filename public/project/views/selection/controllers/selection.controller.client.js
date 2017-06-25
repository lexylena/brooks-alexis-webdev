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
            if (form.$invalid) {
                return;
            }

            var selection = {
                description: form.description,
                defaultDescription: form.defaultDescription
            };

            selectionService.updateSelection(vm.selectionId, selection)
                .then(function (status) {
                    $('#editSelection').modal('hide');
                    vm.selection.description = form.description;
                    vm.selection.defaultDescription = form.defaultDescription;
                });
        }

        function deleteSelection() {
            selectionService.deleteSelection(vm.selectionId)
                .then(function (status) {
                    $location.url('/curator/' + vm.curatorId + '/collection/' + vm.collectionId);
                });
        }

        function addComment(form) {
            if (form.$invalid) {
                return;
            }

            var comment = { text: form.text };

            commentService.addComment(vm.selectionId, comment)
                .then(function(comment) {
                    vm.comments.push(comment);

                    form.text = '';
                });
        }

        function deleteComment(comment) {
            var idx = vm.comments.indexOf(comment);
            commentService.deletecomment(comment._id)
                .then(function (status) {
                    vm.comments.splice(idx, 1);
                })
        }
    }

})();