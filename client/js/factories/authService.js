angular.module('authService')

    .factory('Auth', function ($window) {
        // var baseURL = window.location.protocol + '//' + window.location.host;
        var authenToken = {};
        //console.log(authenToken.getRole)

        authenToken.setToken = function (token) {
            console.log('settoken: ', token)
            $window.localStorage.setItem('token', token);
        };

        authenToken.setRole = function (role) {
            console.log('setrole: ', role)
            $window.localStorage.setItem('role', role);
        };
        //remove user's authentication when the user closes the browser
        authenToken.deleteToken = function () {
            console.log('token deleted')
            $window.localStorage.removeItem('token');
            $window.localStorage.removeItem('role');
        };

        //authenToken.deleteRole = function () {
            

        //Get user's current token from the browser cookie
        authenToken.getToken = function () {
            return $window.localStorage.getItem('token');
        };

        authenToken.getRole = function () {
            return $window.localStorage.getItem('role');
        };

        return authenToken;
    })

    //for backend use
    .factory('AuthBackend', function (Auth) {
        var authen = {};

        anthen.request = function (config) {
            var token = Auth.getToken();

            if (token) config.headers['access-token'] = token;

            return config;
        };

        return authen;
    })