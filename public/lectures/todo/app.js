/**
 * Created by alexisbrooks on 5/10/17.
 */
// IIFE immediately invoked function (self executes) to avoid overriding namespaces
// (function() {
//      ...
// }) ();

(function() {
    // angular.module() with single arg, interpreted as 'get this module';
    // second arg is list of dependencies, interpreted as 'set'
    angular
        .module("TodoApp", [])
        .controller("TodoListController", TodoListController);
        // controller being called on returned module; known by name in the app
        // declaring that controller as available by that name

    // $scope instantiated by underlying framework; object-oriented way for views to talk to controller and vice-versa
    // anything declared with $scope in either controller or views is available in other
    function TodoListController($scope, $http) { // http allows interact with any http source
        $scope.todo = {title: "initial title", details: "initial details"};
        $scope.addTodo = addTodo; // mapping function declared in scope to local function
        $scope.removeTodo = removeTodo;
        $scope.selectTodo = selectTodo;
        $scope.updateTodo = updateTodo;


        function init() {
            findAllTodos();
        }
        init();

        function findAllTodos() {
            $http.get('/api/todo')
                .then(function (response) {
                    $scope.todos = response.data;
                });
        }

        function addTodo(todo) {
            // var newTodo = {
            //     title: todo.title
            // };
            var newTodo = angular.copy(todo);
            newTodo._id = (new Date()).getTime();
            newTodo.date = new Date();

            // $scope.todos.push(newTodo);
            // console.log(newTodo);

            $http.post('api/todo/', newTodo).then(findAllTodos());
        }

        function removeTodo(todo) {
            console.log(todo);
            var index = $scope.todos.indexOf(todo);
            // $scope.todos.splice(index, 1); // remove 1 element beginning at index
            $http.delete('/api/todo/' + index).then(findAllTodos());
        }

        function selectTodo(index) {
            $scope.todo = angular.copy($scope.toods[index]);
            $scope.selectedIndex = index;
        }

        function updateTodo(todo) {
            $scope.todos[$scope.selectedIndex] = angular.copy(todo);
        }
    }

    /*
    MVC
     - views: html, css, 'immediately consumed by human actor'
     - controller: respond to events generated from views (handle event stream from views)
                    and manipulates model accordingly then returns data from model back to views
     - model: representations/structure of data and their relationships
    */
}) ();