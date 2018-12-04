angular.module('directoryApp')
  .controller('SigninController', function ($rootScope, $uibModal, $state, $stateParams, $window) {
    var modalInstance = $uibModal.open({
      windowClass: 'modal-center',
      templateUrl: 'views/signin.modal.view.html',
      controller: 'UserController',
      controllerAs: 'vm',
      resolve: {
        item: function () {
          return $stateParams.id
        }
      }
    })

    modalInstance.result.then(function () {
      // Value submitted
    }, function (path) {
      // Modal dismissed. 
      $state.go(path);
    })
  })
  .controller('SignupController', function ($rootScope, $uibModal, $state, $stateParams, $window) {
    var modalInstance = $uibModal.open({
      windowClass: 'modal-center',
      templateUrl: 'views/signup.modal.view.html',
      controller: 'UserController',
      controllerAs: 'vm',
      resolve: {
        item: function () {
          return $stateParams.id
        }
      }
    })

    modalInstance.result.then(function () {
      // Value submitted
    }, function (path) {
      // Modal dismissed. 
      $state.go(path);
    })
  })