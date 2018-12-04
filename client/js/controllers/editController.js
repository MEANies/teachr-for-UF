angular.module('directoryApp').controller('EditController',
  function ($rootScope, $uibModal, $state, $stateParams, $window) {

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

    modalInstance.result.then(function () {
      // Value submitted
      console.log("Debug: Edit Modal Closed")
    }, function (path) {
      // Modal dismissed. 
      console.log("Debug: Edit Modal Dismissed")
      if (path == 'backdrop click') {
        $state.go('home');
      }
      else {
        $state.go(path);
      }

    })
  });

angular.module('directoryApp').controller('EditModalInstanceController', function ($uibModalInstance) {
  var $ctrl = this;

  $ctrl.ok = function () {
    $uibModalInstance.close('Closed');
  };

  $ctrl.cancel = function () {
    console.log("Debug: Edit Modal Canceled");
    $uibModalInstance.dismiss('home');
  };
});