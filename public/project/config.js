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

            .when('/admin', {
                templateUrl: 'views/admin/templates/admin-list.view.client.html',
                controller: 'adminListController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/update/:userId', {
                templateUrl: 'views/admin/templates/admin-edit.view.client.html',
                controller: 'adminEditController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/create', {
                templateUrl: 'views/admin/templates/admin-create.view.client.html',
                controller: 'adminCreateController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkAdmin
                }
            })


            .when('/', {
                templateUrl: 'views/homepage/html5up-twenty/index.html',
                controller: 'searchController',
                controllerAs: 'vm'
            })

            .when('/search', { //?keyword=___&searchType=_____
                templateUrl: 'views/homepage/html5up-twenty/index.html',
                controller: 'searchController',
                controllerAs: 'vm'
            })


            // user routes
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
            .when('/curator/:curatorId', {
                templateUrl: 'views/user/templates/curator-profile.view.client.html',
                controller: 'curatorProfileController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/artist/:artistId', {
                templateUrl: 'views/user/templates/artist-profile.view.client.html',
                controller: 'artistProfileController', // ng-include artist-user profile and artist-details based on if artistId has prefix 'HAM_'
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/settings', {
                templateUrl: 'views/user/templates/settings.view.client.html',
                controller: 'settingsController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/curator/:curatorId/userList/:userListType', {
                templateUrl: 'views/user/templates/user-list.view.client.html',
                controller: 'userListController',
                controllerAs: 'vm'
            })



            // artwork routes
            .when('/artist/:artistId/artwork', {
                templateUrl: 'views/artwork/templates/artwork-list.view.client.html',
                controller: 'artworkListController',
                controllerAs: 'vm'
            })
            .when('/artist/:artistId/artwork/:artworkId', {
                templateUrl: 'views/artwork/templates/artwork-details.view.client.html',
                controller: 'artworkDetailsController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/artwork/new', {
                templateUrl: 'views/artwork/templates/artwork-new.view.client.html',
                controller: 'artworkNewController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkLoggedInArtist // check if currentUser is artist
                }
            })
            // .when('/artwork/:artworkId', {
            //     templateUrl: 'views/artwork/templates/artwork-edit.view.client.html',
            //     controller: 'artworkEditController',
            //     controllerAs: 'vm',
            //     resolve: {
            //         currentUser: checkArtworkArtist // check if artwork._artist === currentUser._id
            //     }
            // })



            // collection routes -- collection-new and collection-edit are modals
            .when('/curator/:curatorId/collection', {
                templateUrl: 'views/collection/templates/collection-list.view.client.html',
                controller: 'collectionListController',
                controllerAs: 'vm'
            })
            .when('/collection/new', {
                templateUrl: 'views/collection/templates/collection-new.view.client.html',
                controller: 'collectionNewController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkLoggedInCurator
                }
            })
            .when('/collection/:collectionId', {
                templateUrl: 'views/collection/templates/collection-edit.view.client.html',
                controller: 'collectionEditController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkCollectionCurator
                }
            })



            // selection routes -- selection-new and selection-edit are modals
            .when('/curator/:curatorId/collection/:collectionId/selection', {
                templateUrl: 'views/selection/templates/selection-list.view.client.html',
                controller: 'selectionListController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/curator/:curatorId/collection/:collectionId/selection/:selectionId', {
                templateUrl: 'views/selection/templates/selection.view.client.html',
                controller: 'selectionController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkCurrentUser
                }
            });
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

    function checkAdmin($q, $location, userService) {
        var deferred = $q.defer();
        userService.isAdmin()
            .then(function (currentUser) { // either user object or 0
                if (currentUser === '0') {
                    deferred.reject();
                    $location.url('/');
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

    function checkArtworkArtist($q, $location, $route, userService, artworkService) {
        var deferred = $q.defer();
        var artworkId = $route.current.params['artworkId'];
        userService.isLoggedIn()
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    artworkService.findArtworkById(artworkId)
                        .then(function (artwork) {
                            if (currentUser._id !== artwork._artist) {
                                deferred.reject();
                                $location.url('/home');
                            } else {
                                deferred.resolve(currentUser);
                            }
                        });
                }
            });
        return deferred.promise;
    }

    function checkLoggedInArtist($q, $location, userService) {
        var deferred = $q.defer();
        userService.isLoggedIn()
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else if (currentUser.roles.indexOf('ARTIST') === -1) {
                    deferred.reject();
                    $location.url('/home');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkLoggedInCurator($q, $location, userService) {
        var deferred = $q.defer();
        userService.isLoggedIn()
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else if (currentUser.roles.indexOf('CURATOR') === -1) {
                    deferred.reject();
                    $location.url('/home');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkCollectionCurator($q, $location, $route, userService, collectionService) {
        var deferred = $q.defer();
        var collectionId = $route.current.params['collectionId'];
        userService.isLoggedIn()
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    collectionService.findCollectionById(collectionId)
                        .then(function (collection) {
                            if (currentUser._id !== collection._owner) {
                                deferred.reject();
                                $location.url('/home');
                            } else {
                                deferred.resolve(currentUser);
                            }
                        });
                }
            });
        return deferred.promise;
    }
})();