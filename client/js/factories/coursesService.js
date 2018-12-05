angular.module('listings')
	.factory('Courses', function ($http) {
		var methods = {
			getAll: function(username) {
				return $http.post('/api/courses', username);
			},
			getByCode: function(code, term) {
				return $http.get(`/api/courses/code/${term}/${code}`);
			}
		}

		return methods;
	});