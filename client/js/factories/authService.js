angular.module('authService', [])
    
  .factory('Auth', function($window) {
    // var baseURL = window.location.protocol + '//' + window.location.host;
      var authenToken = {};

      authenToken.setToken = function(token) {
        $window.localStorage.setItem('token', token);
      };
      //remove user's authentication when the user closes the browser
      authenToken.deleteToken = function(token) {
        $window.localStorage.removeItem('token');
      };

      //Get user's current token from the browser cookie
      authenToken.getToken = function() {
        return $window.localStorage.getItem('token');
      };

      return authenToken;
  })

  //for backend use
  .factory('AuthBackend', function(Auth) {
    var authen = {};

    anthen.request = function(config) {
      var token = Auth.getToken();

      if(token) config.headers['access-token'] = token;

      return config;
    };

    return authen;
  })
  
  