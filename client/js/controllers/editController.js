angular.module('directoryApp').controller('EditController', 
function($rootScope, $uibModal, $state, $stateParams, $window) {

    var modalInstance = $uibModal.open({
        windowClass: 'modal-center',
        templateUrl: 'views/edit.modal.view.html',
        controller: function(item) {
          this.item = item;
        },
        controllerAs: '$ctrl',
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