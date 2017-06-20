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


            .when('/home', {
                templateUrl: 'views/search/home.html',
                controller: 'homeController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
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
            .when('/profile/:uid', {
                templateUrl: 'views/user/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
    }

    function checkLoggedIn($q, $location, userService) {
        var deferred = $q.defer();
        userService.isLoggedIn()
            .then(function (currentUser) { // either user object or 0
                if (currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkCurrentUser($q, userService) {
        var deferred = $q.defer();
        userService.isLoggedIn()
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
})();