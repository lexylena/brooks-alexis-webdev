/**
 * Created by alexisbrooks on 6/4/17.
 */
(function() {
    angular
        .module('project')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/user/templates/home.html',
                controller: 'homeController',
                controllerAs: 'vm'
            })
    }
})();