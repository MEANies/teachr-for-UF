angular.module('userService', ['authService'])
    .factory('User', function($http, $q, Auth) {
        user = {};

        user.register = function(data) {
            return $http.post('/api/auth/create', data).then(function(data) {
                Auth.setRole(data.data.role);
            });
        };

        user.login = function(data) {
            return $http.post('/api/auth/authorize', data).then(function(data) {
                Auth.setToken(data.data.token);
                Auth.setRole(data.data);
                return data;
            });
        };

        user.loginStatus = function() {
            let token = Auth.getToken();
            if(token && token != 'undefined')
                return true;
            else 
                return false;
        };


        user.logout = function() {
            Auth.deleteToken();
        };

        user.getUser = function() {
            if(Auth.getToken()) {
                //To-do: implement get-user in the backend
                return $http.get('/api/auth/currentUser');
            } else {
                $q.reject({
                    message: 'User is not authorized!'
                });
            }
        };

        return user;
    })