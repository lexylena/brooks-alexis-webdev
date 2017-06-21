/**
 * Created by alexisbrooks on 6/5/17.
 */
(function () {
    angular
        .module('wbdvDirectives', [])
        .directive('wbdvSortable', wbdvSortable)
        .directive('wbdvPopover', wbdvPopover);



    function wbdvSortable() {

        function linkFunction(scope, element) {

            var initialIdx;
            var finalIdx;

            $(element).sortable({
                axis: 'y',
                cursor: 'move',
                handle: '.glyphicon.glyphicon-align-justify',
                start: function(event, ui) {
                    initialIdx = $('li').index(ui.item);
                },

                stop: function(event, ui) {
                    finalIdx = $('li').index(ui.item);
                    scope.vm.updateSortableOrder(initialIdx, finalIdx);
                }

            });
        }

        return {
            link: linkFunction
        }

    }


    function wbdvPopover() {

        function linkFunction(scope, element) {

            element.popover({
                trigger: 'focus'
            });
        }

        return {
            link: linkFunction
        }

    }

})();