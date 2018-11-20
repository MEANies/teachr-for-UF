(function () {
  'use strict';

  // Coursecruds controller
  angular
    .module('coursecruds')
    .controller('CoursecrudsController', CoursecrudsController);

  CoursecrudsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'coursecrudResolve'];

  function CoursecrudsController ($scope, $state, $window, Authentication, coursecrud) {
    var vm = this;

    vm.authentication = Authentication;
    vm.coursecrud = coursecrud;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Coursecrud
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.coursecrud.$remove($state.go('coursecruds.list'));
      }
    }

    // Save Coursecrud
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.coursecrudForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.coursecrud._id) {
        vm.coursecrud.$update(successCallback, errorCallback);
      } else {
        vm.coursecrud.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('coursecruds.view', {
          coursecrudId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
