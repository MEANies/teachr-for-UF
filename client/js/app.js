/* register the modules the application depends upon here*/
angular.module('listings', ['ngAnimate', 'ui.bootstrap', 'ui.router']);
angular.module('authService', []);
angular.module('userService', ['authService']);
angular.module('user', ['userService']);

/* register the application and inject all the necessary dependencies */
var app = angular.module('directoryApp', ['listings', 'ngAnimate', 'ui.bootstrap', 'ui.router', 'user'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        // Classical routes naming
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'index.html',
                controller: 'mapController'
            })

            .state('edit', {
                url: '/edit',
                controller: 'EditController'
            })

            .state('signup', {
                url: '/signup',
                controller: 'SignupController'
            })

            .state('signin', {
                url: '/signin',
                controller: 'SigninController'
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