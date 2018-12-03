angular.module('user')
    .factory('User', function (Auth, $http) {
        console.log("Debug: User Factory");
        var methods = {
            debug: function() {
                console.log("Debug: User.Factory.debug");
            },
            register: function (data) {
                console.log("Debug: User.register");
                return $http.post('/api/auth/create', data).then(function (data) {
                    Auth.setRole(data.data.role);
                });
            },
            login: function (data) {
                return $http.post('/api/auth/authorize', data).then(function (data) {
                    Auth.setToken(data.data.token);
                    Auth.setRole(data.data);
                    return data;
                });
            },
            loginStatus: function () {
                let token = Auth.getToken();
                if (token && token != 'undefined')
                    return true;
                else
                    return false;
            },
            logout: function () {
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