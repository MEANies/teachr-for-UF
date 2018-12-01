var app = angular.module('Routers', ['ui.router'])
    
	.config(function($stateProvider, $locationProvider) {

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'js/views/home.html',
				controller: 'ListingsController',
				data: {
					roles: ['user', 'instructor']
				}
			})
			.state('login', {
				url:'/login',
				templateUrl: 'js/views/login.html',
				controller: 'UserController',
				controllerAs: 'vm' 
			})
			.state('register', {
				url:'/register',
				templateUrl: 'js/views/register.html',
				controller: 'UserController',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/'
			});
	});

app.run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
		if(Auth.getRole() !== toStateParams.roles) {
			$state.go('login');
		} else {
			console.log('Not role');
		}
	})
}]);