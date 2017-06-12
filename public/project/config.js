/**
 * Created by alexisbrooks on 6/4/17.
 */
(function() {
    angular
        .module('project')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/poc', {
                templateUrl: 'views/poc/poc.html',
                controller: 'pocController',
                controllerAs: 'vm'
            })


            // .when('/home', {
            //     templateUrl: 'views/search/home.html',
            //     controller: 'homeController',
            //     controllerAs: 'vm'
            // })
            // .when('/user/:uid/home', {
            //     templateUrl: 'views/search/home.html',
            //     controller: 'homeController',
            //     controllerAs: 'vm'
            // })


            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'vm'
            })
            // // a logged in user is viewing a profile
            // .when('/user/:uid/profile/:uid', {
            //     templateUrl: 'views/user/profile.view.client.html',
            //     controller: 'profileController',
            //     controllerAs: 'vm'
            // })
            // // an anonymous user is viewing a profile
            // .when('/profile/:uid', {
            //     templateUrl: 'views/user/profile.view.client.html',
            //     controller: 'profileController',
            //     controllerAs: 'vm'
            // })
    }
})();