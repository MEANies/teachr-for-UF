(function () {
  'use strict';

  angular
    .module('coursecruds')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('coursecruds', {
        abstract: true,
        url: '/coursecruds',
        template: '<ui-view/>'
      })
      .state('coursecruds.list', {
        url: '',
        templateUrl: 'modules/coursecruds/client/views/list-coursecruds.client.view.html',
        controller: 'CoursecrudsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Coursecruds List'
        }
      })
      .state('coursecruds.create', {
        url: '/create',
        templateUrl: 'modules/coursecruds/client/views/form-coursecrud.client.view.html',
        controller: 'CoursecrudsController',
        controllerAs: 'vm',
        resolve: {
          coursecrudResolve: newCoursecrud
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Coursecruds Create'
        }
      })
      .state('coursecruds.edit', {
        url: '/:coursecrudId/edit',
        templateUrl: 'modules/coursecruds/client/views/form-coursecrud.client.view.html',
        controller: 'CoursecrudsController',
        controllerAs: 'vm',
        resolve: {
          coursecrudResolve: getCoursecrud
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Coursecrud {{ coursecrudResolve.name }}'
        }
      })
      .state('coursecruds.view', {
        url: '/:coursecrudId',
        templateUrl: 'modules/coursecruds/client/views/view-coursecrud.client.view.html',
        controller: 'CoursecrudsController',
        controllerAs: 'vm',
        resolve: {
          coursecrudResolve: getCoursecrud
        },
        data: {
          pageTitle: 'Coursecrud {{ coursecrudResolve.name }}'
        }
      });
  }

  getCoursecrud.$inject = ['$stateParams', 'CoursecrudsService'];

  function getCoursecrud($stateParams, CoursecrudsService) {
    return CoursecrudsService.get({
      coursecrudId: $stateParams.coursecrudId
    }).$promise;
  }

  newCoursecrud.$inject = ['CoursecrudsService'];

  function newCoursecrud(CoursecrudsService) {
    return new CoursecrudsService();
  }
}());
