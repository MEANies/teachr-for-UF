angular.module('listings', []).factory('Listings', function($http) {
  // var baseURL = window.location.protocol + '//' + window.location.host;
  var methods = {
    getAll: function() {
      return $http.get('https://whispering-plains-44803.herokuapp.com/api/listings');
    },
	
	create: function(listing) {
    return $http.post('https://whispering-plains-44803.herokuapp.com/api/listings', listing);
    }, 

    delete: function(id) {
	   /**TODO
        return result of HTTP delete method
       */
      return $http.delete('https://whispering-plains-44803.herokuapp.com/api/listings/' + id);
    }
  };

  return methods;
});
