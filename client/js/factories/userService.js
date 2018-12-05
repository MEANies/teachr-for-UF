angular.module('user')
	.factory('User', function (Auth, $http) {
		console.log("Debug: User Factory");
		var methods = {
			debug: function () {
				console.log("Debug: User.Factory.debug");
			},
			register: function (data) {
				return $http.post('/api/auth/create', data).then(function (data) {
					console.log('Debug: User.register.response');
					Auth.setRole(data.data.role);
				});
			},
			login: function (data) {
				console.log('Debug: User.login');
				return $http.post('/api/auth/authorize', data).then(function (data) {
					console.log('Debug: User.login.response');
					console.log('user token: ', data.data.token)
					Auth.setToken(data.data.token);
					console.log('user role: ', data.data.role)
					Auth.setRole(data.data.role);
					let role = Auth.getRole();
					console.log('UserService getrole: ', role)
					return data;
				});
			},
			loginStatus: function () {
				let token = Auth.getToken();
				if (token && token != 'undefined') {
					console.log('user is logged in', token)
					return true;
				}
				else {
					console.log('user is logged out', token)
					return false;					
				}
					
			},
			logout: function () {
				console.log('userFac logged out')
				Auth.deleteToken();
			},
			getUser: function () {
				if (Auth.getToken()) {
					//To-do: implement get-user in the backend
					return $http.get('/api/auth/currentUser');
				} else {
					$q.reject({
						message: 'User is not authorized!'
					});
				}
			}
		}
		return methods;
	})
