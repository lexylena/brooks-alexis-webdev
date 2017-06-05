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
                templateUrl: 'home.html'
            })
            .when('default', {
                templateUrl: 'home.html'
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
            .when('/user/:uid', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'vm'
            })


            // website urls
            .when('/user/:uid/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'vm'
            })
            .when('/user/:uid/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'vm'
            })
            .when('/user/:uid/website/:wid', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'vm'
            })


            // page routing
            .when('/user/:uid/website/:wid/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'vm'
            })
            .when('/user/:uid/website/:wid/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'vm'
            })
            .when('/user/:uid/website/:wid/page/:pid', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'vm'
            })


            // widget routing
            .when('/user/:uid/website/:wid/page/:pid/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'vm'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new', {
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller: 'widgetChooserController',
                controllerAs: 'vm'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'vm'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid/search', {
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'flickrImageSearchController',
                controllerAs: 'vm'
            })
    }
})();