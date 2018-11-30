angular.module('user')
    .controller('UserController', ['$scope', '$location', '$http', '$timeout', 'userService', 

  function($scope, $location ,$http, $timeout, User) {
    

    // $scope.logIn = function(){

    //     $scope.formError = false;
    //     $scope.inputError = false;

    //     if($scope.username === undefined || $scope.password == undefined || $scope.username == "" || $scope.password == ""){
    //         $scope.formError = true;
    //         return;
    //     }

        // $http.post('/api/auth/authorize', {username: $scope.username, password: $scope.password})
        //     .then(function(response){
        //         window.location.href = "/home.html";
        //     },
        //     function(response){
        //         if(response.status !== 200){
        //             console.log(response.status);
        //             $scope.inputError = true;
        //             //$scope.$apply();
        //         }
        //     });
        
        /*
        To-do:
            call the APIs inside the service instead of directly use http
        */

    //};

    //using 'this' instead of 'scope', need to use Controller as vm in views or ui-routers
		var vm = this;
		
		//Function to resgiter users
    vm.resgiter = function(resgiterData) {
			vm.formError = false;
			vm.inputError = false;
			//call methods inside userService 

			if (vm.resgiterData.username === undefined || vm.resgiterData.password === undefined ||vm.resgiterData.email === undefined || vm.resgiterData.role === undefined ||
				vm.resgiterData.username == "" || vm.resgiterData.password == "" || vm.resgiterData.email == "" || vm.resgiterData.role == '') {
				vm.formError = true;
				return;
			}
			User.register(vm.registerData)
				.then(
					function(response) {
						console.log(response.data);
						//consider using $location instead of windows
						//$location.path('/home');
						window.location.href = "/login.html";
					}, function(err) {
						if(err.status != 200) {
							vm.inputError = true;
						}
			});
		};


		
		
  }

]);