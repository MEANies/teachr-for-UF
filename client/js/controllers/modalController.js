angular.module('directoryApp')
    .controller('SigninController', function($rootScope, $uibModal, $state, $stateParams, $window){
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
          
          modalInstance.result.then(function() {
            // Value submitted
          }, function() {
            // Modal dismissed. 
            if ($rootScope.previousState.name == '') {
              // No previous state to go? Go to list page
              $state.go('home');
            } else {
              // Back to previous state if any
              $window.history.back();
            }
          })
    })
    .controller('SignupController', function($rootScope, $uibModal, $state, $stateParams, $window){
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
          
          modalInstance.result.then(function() {
            // Value submitted
          }, function() {
            // Modal dismissed. 
            if ($rootScope.previousState.name == '') {
              // No previous state to go? Go to list page
              $state.go('home');
            } else {
              // Back to previous state if any
              $window.history.back();
            }
          })
    })