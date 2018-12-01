/* register the modules the application depends upon here*/
// angular.module('directoryApp', 
//     ['Routers',
//     'listings',
//     'user',
//     'register',
//     'authService',
//     'userService'
//     ]);

/* register the application and inject all the necessary dependencies */
//var app = angular.module('directoryApp', ['listings']);
angular.module('listings', ['ngAnimate', 'ui.bootstrap', 'ui.router']);

/* register the application and inject all the necessary dependencies */
var app = angular.module('directoryApp', ['listings', 'ngAnimate', 'ui.bootstrap', 'ui.router','Routers', 'user', 'register', 'authService', 'userService'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        // Classical routes naming
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'index.html'
            })

            .state('edit', {
                url: '/edit',
                controller: 'EditController'
            })

            .state('signup', {
                url: '/signup',
                controller: 'UserController'
            })

            .state('signin', {
                url: '/signin',
                controller: 'UserController'
            })

            .state('search', {
                url: '/search',
                controller: 'SearchController'
            })
    })

    // We really need this. All the modals should be closed when navigating to places
    .run(function ($rootScope, $uibModalStack) {
        $rootScope.previousState = null;

        $rootScope.$on('$stateChangeStart', function () {
            $uibModalStack.dismissAll();
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, from, fromParams) {
            $rootScope.previousState = from;
        });
    })
