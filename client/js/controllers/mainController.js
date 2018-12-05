angular.module('directoryApp')
	.controller('MainController', function(User, Auth, $location, $state, $route,$rootScope) {
		var vm = this;
		console.log('debug: mainctrl')
		vm.isAdmin = false;
		
		vm.name = 'professorx';
		
		vm.logout = function() {
			User.logout();
			vm.isAdmin = false;
			vm.isLoggedIn = false;
			console.log('logged out suc!')
			$state.go('signin');
			//$rootScope.$emit('userLoggedOutSuccess', {message: "bye"});
		};

		vm.isLoggedIn = false;
		//when user changes the routes, check if user is logged in
		$rootScope.$on('userLoggedInSuccess', function() {
			console.log('called')
			if(User.loginStatus()) {
				console.log('user just logged in')
				vm.isLoggedIn = true;
				if(Auth.getRole() === 'instructor' || Auth.getRole() === 'ta') {
					vm.isAdmin = true;
				}
			} else {
				vm.isLoggedIn = false;
				vm.isAdmin = false;
				vm.logout();
			}
		});

		// $rootScope.$on('userLoggedOutSuccess', function() {
		// 	console.log('called logout')
			
		// });
		if(Auth.getRole() === 'instructor' || Auth.getRole() === 'ta') {
			vm.isAdmin = true;
		}


		if(User.loginStatus()) {
			vm.isLoggedIn = true;
		} else {
			vm.isLoggedIn = false;
		}
		
		//log out user AKA delete token
		

		console.log('currentRole: ', Auth.getRole())
		console.log('islogin ', vm.isLoggedIn)
	})
