// Coursecruds service used to communicate Coursecruds REST endpoints
(function () {
  'use strict';

  angular
    .module('coursecruds')
    .factory('CoursecrudsService', CoursecrudsService);

  CoursecrudsService.$inject = ['$resource'];

  function CoursecrudsService($resource) {
    return $resource('api/coursecruds/:coursecrudId', {
      coursecrudId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
