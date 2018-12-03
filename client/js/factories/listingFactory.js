angular.module('listings').factory('Listings', function($http) {
  // var baseURL = window.location.protocol + '//' + window.location.host;
  var methods = {
    getAll: function() {
      return $http.get('./api/listings');
    },
  
    create: function(listing) {
    return $http.post('./api/listings', listing);
    }, 

    // update: function(listing) {
    //   return $http.put('./api/listings', listing);
    // },

    delete: function(id) {
     /**TODO
        return result of HTTP delete method
       */
       return $http.delete('./api/listings/' + id)
    }
  };

  return methods;
});
