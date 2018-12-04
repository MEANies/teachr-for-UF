angular.module('directoryApp')
	.controller('MainController', function(User, Auth, $location, $route,$rootScope) {
		var vm = this;
		console.log('debug: mainctrl')
		
		
		vm.logout = function() {
			User.logout();
			console.log('logged out suc!')
			$state.go('home');
		};

		vm.isLoggedIn = false;
		//when user changes the routes, check if user is logged in
		$rootScope.$on('userLoggedInSuccess', function() {
			console.log('called')
			if(User.loginStatus()) {
				console.log('user just logged in')
				vm.isLoggedIn = true;
			} else {
				vm.isLoggedIn = false;
				vm.logout();
			}
		});

		if(User.loginStatus()) {
			vm.isLoggedIn = true;
		} else {
			vm.isLoggedIn = false;
		}
		
		//log out user AKA delete token
		


		console.log('islogin ', vm.isLoggedIn)
	})
