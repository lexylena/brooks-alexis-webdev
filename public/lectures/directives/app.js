/**
 * Created by alexisbrooks on 6/6/17.
 */
(function () {
    angular
        .module('DirectiveLecture', ['WAM'])
        .directive('hello', helloTag)
        .directive('wdDraggable', wdDraggable)
        .directive('wdSortable', wdSortable);

    function wdSortable() {
        function linkFunction(scope, element) {
            $(element).sortable();
        }

        return {link: linkFunction}
    }

    function wdDraggable() {

        function linkFunction(scope, element) {

            var initialIdx;
            var finalIdx;

            $(element).sortable({
                start: function (event, ui) {
                    initialIdx = $(element).index(ui.item);
                },

                stop: function (event, ui) {
                    finalIdx = $(element).index(ui.item);
                    console.log('ui.item._id = ' + ui.item._id);
                    console.log(initialIdx + ' -> ' + finalIdx);
                    // scope.updateOrder(ui.item._id, initialIdx, finalIdx);
                }

            });
        }

        return {
            link: linkFunction
        }
    }

    function helloTag() {

        function linkFunction(scope, element, attrs) {
            console.log(element);
            element.html('goodbye');
        }

        return {
            templateUrl: 'hello.html',
            link: linkFunction
        }
    }
})();