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

angular.module('directoryApp').controller('EditModalInstanceController', function ($uibModalInstance, User) {
  var $ctrl = this;

  $ctrl.periods = [
    '(1) 7:25 AM - 8:15 AM',
    '(2) 8:30 AM - 9:20 AM',
    '(3) 9:35 AM - 10:25 AM',
    '(4) 10:40 AM - 11:30 AM',
    '(5) 11:45 AM - 12:35 PM',
    '(6) 12:50 PM - 1:40 PM',
    '(7) 1:55 PM - 2:45 PM',
    '(8) 3:00 PM - 3:50 PM',
    '(9) 4:05 PM - 4:55 PM',
    '(10) 5:10 PM - 6:00 PM',
    '(11) 6:15 PM - 7:05 PM',
    '(E1) 7:20 PM - 8:10 PM',
    '(E2) 8:20 PM - 9:10 PM',
    '(E3) 9:20 PM - 10:10 PM'
  ];

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

  officeHours = [
    {
      day: 'Monday',
      period: [7, 8]
    },
    {
      day: 'Tuesday',
      period: [8]
    },
    {
      day: 'Wednesday',
      period: [5]
    },
    {
      day: 'Friday',
      period: [8]
    },
  ]

  $ctrl.localOfficeHours = [];
  $ctrl.formatOfficeHours = function() {
    
  }

  $ctrl.togglePeriod = function(target) {
    // When clicked, should toggle color of the entry
    // if (target.style.background != 'blue')
    //   target.style.background = 'blue';
    // else target.style.background = 'white';
    console.log("Debug: togglePeriod");
  }

  $ctrl.submitOfficeHours = function(newOfficeHours) {

  }

  User.getAdminCourses().then(function(response) {
    $ctrl.courses = response.data;
    $ctrl.courses.forEach(course => {
      // TODO
    });
  }
  )
});