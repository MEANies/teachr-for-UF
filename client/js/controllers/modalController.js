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
      if (path == 'backdrop click') {
        $state.go('home');
      }
      else {
        $state.go(path);
      }
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
      if (path == 'backdrop click') {
        $state.go('home');
      }
      else {
        $state.go(path);
      }
    })
  })
  .controller('DetailsController', function ($rootScope, $uibModal, $state, $stateParams, $window) {
    var modalInstance = $uibModal.open({
      windowClass: 'modal-center',
      templateUrl: 'views/professor.modal.view.html',
      controller: function(name) {
        this.name = name;
        console.log(name);
      },
      controllerAs: 'vm',
      resolve: {
        name: function () {
          return $stateParams.name
        }
      }
    })

    modalInstance.result.then(function () {
      // Value submitted
    }, function (path) {
      // Modal dismissed. 
      if (path == 'backdrop click') {
        $state.go('home');
      }
      else {
        $state.go(path);
      }
    })
  })
