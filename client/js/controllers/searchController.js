angular.module('directoryApp').controller('SearchController',
  function ($rootScope, $uibModal, $state, $stateParams, $window) {
    var modalInstance = $uibModal.open({
      windowClass: 'modal-center',
      templateUrl: 'views/search.modal.view.html',
      controller: 'ListingsController',
      controllerAs: '$ctrl',
      resolve: {
        item: function () {
          return $stateParams.id
        }
      }
    })

    modalInstance.result.then(function () {
      // Value submitted
    }, function () {
      // Modal dismissed. 
      $state.go('home');
    })
  })