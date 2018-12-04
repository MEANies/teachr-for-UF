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

  $ctrl.courses = [
    {
      code: 'COP 4600', 
      name: 'Operating Systems', 
      department: {}, 
      instructor_names: {},
      description: {},
      building: {},
      building_code: {},
      office_hours: [{
        office_meetDays: {},
        office_meetTimeBegin:{},
        office_meetTimeEnd:{},
        office_meetPeriodBegin:{},
        office_meetPeriodEnd:{},
        office_instructor:{},
        office_locationCommonName:{},
      }]
      // created_at: Date,
      // updated_at: Date
    },
    {
      code: 'CEN 3031', 
      name: 'Introduction to Software Engineering', 
      department: {}, 
      instructor_names: {},
      description: {},
      building: {},
      building_code: {},
      office_hours: [{
        office_meetDays: {},
        office_meetTimeBegin:{},
        office_meetTimeEnd:{},
        office_meetPeriodBegin:{},
        office_meetPeriodEnd:{},
        office_instructor:{},
        office_locationCommonName:{},
      }]
      // created_at: Date,
      // updated_at: Date
    }
  ];
});