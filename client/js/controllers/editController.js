angular.module('directoryApp').controller('EditController', 
function($rootScope, $uibModal, $state, $stateParams, $window) {

    var modalInstance = $uibModal.open({
        windowClass: 'modal-center',
        templateUrl: 'views/edit.modal.view.html',
        controller: 'EditModalInstanceController',
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
});

angular.module('directoryApp').controller('EditModalInstanceController', function ($uibModalInstance, items) {
  var $ctrl = this;
  $ctrl.items = items;
  $ctrl.selected = {
    item: $ctrl.items[0]
  };

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});