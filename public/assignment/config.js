/**
 * Created by alexisbrooks on 5/24/17.
 */
(function() {
    angular
        .module('WAM')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.view.client.html',
                controller: 'homeController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })


            // user urls
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm' // refer to controller instance as this identifier (usually vm for view model)
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'vm',
                resolve: { // following things must be resolved before navigating to page and using controller
                    currentUser: checkLoggedIn // pointer to existing function that checks some logic

                }
            })


            // website urls
            .when('/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:wid', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkWebsiteDeveloper
                }
            })


            // page routing
            .when('/website/:wid/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkWebsiteDeveloper
                }
            })
            .when('/website/:wid/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkWebsiteDeveloper
                }
            })
            .when('/website/:wid/page/:pid', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkPageDeveloper
                }
            })


            // widget routing
            .when('/website/:wid/page/:pid/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkPageDeveloper
                }
            })
            .when('/website/:wid/page/:pid/widget/new', {
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller: 'widgetChooserController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkPageDeveloper
                }
            })
            .when('/website/:wid/page/:pid/widget/:wgid', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkWidgetDeveloper
                }
            })
            .when('/website/:wid/page/:pid/widget/:wgid/search', {
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'flickrImageSearchController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkWidgetDeveloper
                }
            })
    }

    function checkLoggedIn($q, $location, userService) {
        var deferred = $q.defer();
        userService.checkLoggedIn()
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
        userService.checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkWebsiteDeveloper($q, $location, $route, websiteService) {
        var deferred = $q.defer();
        var wid = $route.current.params['wid'];
        websiteService.checkWebsiteDeveloper(wid)
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkPageDeveloper($q, $location, $route, pageService) {
        var deferred = $q.defer();
        var pid = $route.current.params['pid'];
        pageService.checkPageDeveloper(pid)
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkWidgetDeveloper($q, $location, $route, widgetService) {
        var deferred = $q.defer();
        var wgid = $route.current.params['wgid'];
        widgetService.checkWidgetDeveloper(wgid)
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
})();