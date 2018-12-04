angular.module('user')
	.controller('UserController', ['$scope', '$state', 'User', '$uibModalInstance',
		function ($scope, $state, User, $uibModalInstance) {

			//using 'this' instead of 'scope', need to use Controller as vm in views or ui-routers
			var vm = this;
			vm.userForm = 'registerForm';
			vm.cancel = function () {
				$uibModalInstance.dismiss('home');
			}
			//Function to register users
			vm.register = function () {
				console.log("Debug: vm.register 1");
				vm.formError = false;
				vm.inputError = false;
				//call methods inside userService 

				if (vm.registerData.username === undefined || vm.registerData.password === undefined || vm.registerData.email === undefined || vm.registerData.role === undefined ||
					vm.registerData.username == "" || vm.registerData.password == "" || vm.registerData.email == "" || vm.registerData.role == '') {
					vm.formError = true;
					return;
				}
				User.register(vm.registerData).then(function (response) {
					console.log("Debug: vm.User.register")

					$uibModalInstance.dismiss('signin');

				}, function (err) {
					if (err.status !== 200) {
						vm.inputError = true;
					}
				});
			};


			vm.login = function () {
				vm.formError = false;
				vm.inputError = false;
				//if user is missing any field
				if (vm.loginData.username === undefined || vm.loginData.password == undefined || vm.loginData.username == "" || vm.loginData.password == "") {
					vm.formError = true;
					return;
				}
				console.log("Debug: vm.login 1");
				//call methods inside userService
				User.login(vm.loginData)
					.then(
						function (res) {

							// TODO notify the user that they logged in

							// send the user to the home page
							$uibModalInstance.dismiss('home');

						}, function (err) {
							if (err.status !== 200) {
								console.log(err.status);
								vm.inputError = true;
							}
						});

			};
		}
	]);