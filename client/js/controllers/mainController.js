angular.module('listings', ['authService', 'userService'])
    .controller('MainController', function($rootScope, $location, $timeout, Auth, User) {
        var vm = this;
        vm.loggedin = false;
        //check if user is logged in
        $rootScope.$on('$routeChangeStart', function() {
            if(user.loginStatus()) {
                vm.loggedin = true;
            } 
        });
    })