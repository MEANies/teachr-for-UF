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

angular.module('directoryApp').controller('EditModalInstanceController', function ($uibModalInstance, User, $scope, Listings) {

  Listings.getAll().then(function(response) {
    $scope.listings = response.data;
  }, function(error) {
    console.log('Unable to retrieve listings:', error);
  });
  var $ctrl = this;

  // console.log($scope.listings[0]);

  $ctrl.periods = [
    {
      time: '(1) 7:25 AM - 8:15 AM',
      days: new Array(5)
    },
    {
      time: '(2) 8:30 AM - 9:20 AM',
      days: new Array(5)
    },
    {
      time: '(3) 9:35 AM - 10:25 AM',
      days: new Array(5)
    },
    {
      time: '(4) 10:40 AM - 11:30 AM',
      days: new Array(5)
    },
    {
      time: '(5) 11:45 AM - 12:35 PM',
      days: new Array(5)
    },
    {
      time: '(6) 12:50 PM - 1:40 PM',
      days: new Array(5)
    },
    {
      time: '(7) 1:55 PM - 2:45 PM',
      days: new Array(5)
    },
    {
      time: '(8) 3:00 PM - 3:50 PM',
      days: new Array(5)
    },
    {
      time: '(9) 4:05 PM - 4:55 PM',
      days: new Array(5)
    },
    {
      time: '(10) 5:10 PM - 6:00 PM',
      days: new Array(5)
    },
    {
      time: '(11) 6:15 PM - 7:05 PM',
      days: new Array(5)
    },
    {
      time: '(E1) 7:20 PM - 8:10 PM',
      days: new Array(5)
    },
    {
      time: '(E2) 8:20 PM - 9:10 PM',
      days: new Array(5)
    },
    {
      time: '(E3) 9:20 PM - 10:10 PM',
      days: new Array(5)
    }
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
      "code": "CEN3031",
      "name": "Introduction to Software Engineering",
      "department": "Computer & Information Science & Engineering",
      "description": "Topics include software planning, specifications, coding, testing and maintenance. Gain experience in the team approach to large system development. (M)",
      "building": "CAR",
      "building_code": "0022",
      "office_hours": [
        {
          "office_meetTimeBegin": "4:05 PM",
          "office_meetTimeEnd": "4:55 PM",
          "office_meetPeriodBegin": 9,
          "office_meetPeriodEnd": 9,
          "office_instructor": "Adeel",
          "office_locationCommonName": "CSE",
          "office_meetDays": [
            "W"
          ]
        },
        {
          "office_meetTimeBegin": "9:35 AM",
          "office_meetTimeEnd": "11:30 AM",
          "office_meetPeriodBegin": 3,
          "office_meetPeriodEnd": 4,
          "office_instructor": "Pedro",
          "office_locationCommonName": "CSE",
          "office_meetDays": [
            "M",
            "W",
            "F"
          ]
        }
      ],
      "instructor_names": [
        "Philippa Brown"
      ],
    }
  ];

  $ctrl.localOfficeHours = [];


  $ctrl.formatOfficeHours = function () {
  }

  $ctrl.formatOfficeHours();

  $ctrl.togglePeriod = function (parent, index) {

    $ctrl.parentIndex = undefined;
    $ctrl.currIndex = undefined;


    for (let i = 0; i < $ctrl.localOfficeHours.length; i++) {
      if ($ctrl.localOfficeHours[i].key == parent) {
        $ctrl.parentIndex = i;
        for (let j = 0; j < $ctrl.localOfficeHours[$ctrl.parentIndex].value.length; j++) {
          if ($ctrl.localOfficeHours[$ctrl.parentIndex].value[j].key == index) {
            $ctrl.currIndex = j;
          }
        }
      }
    }
    // When clicked, should toggle color of the entry
    if ($ctrl.parentIndex == undefined) {
      console.log('debug 1');
      console.log($ctrl.localOfficeHours)
      $ctrl.localOfficeHours.push({
        key: parent,
        value: []
      })
      for (let i = 0; i < $ctrl.localOfficeHours.length; i++) {
        if ($ctrl.localOfficeHours[i].key == parent) {
          $ctrl.localOfficeHours[i].value.push(
            {
              key: index,
              value: true
            }
          )
        }
      }
    }
    else if ($ctrl.currIndex == undefined) {
      console.log('debug 2');
      console.log($ctrl.localOfficeHours)

      $ctrl.localOfficeHours[$ctrl.parentIndex].value.push(
        {
          key: index,
          value: true
        }
      );
    }
    else if (!$ctrl.localOfficeHours[$ctrl.parentIndex].value[$ctrl.currIndex].value) {
      console.log('debug 3');
      console.log($ctrl.localOfficeHours)

      $ctrl.localOfficeHours[$ctrl.parentIndex].value[$ctrl.currIndex].value = true;
    }
    else {
      console.log('debug 4');
      console.log($ctrl.localOfficeHours)

      $ctrl.localOfficeHours[$ctrl.parentIndex].value[$ctrl.currIndex].value = false;

    }
  }

  $ctrl.checkCellState = function(parent,index) {

    let parentIndex = undefined;
    let currIndex = undefined;

    for (let i = 0; i < $ctrl.localOfficeHours.length; i++) {
      if ($ctrl.localOfficeHours[i].key == parent) {
        parentIndex = i;
        for (let j = 0; j < $ctrl.localOfficeHours[parentIndex].value.length; j++) {
          if ($ctrl.localOfficeHours[parentIndex].value[j].key == index) {
            currIndex = j;
          }
        }
      }
    }
    // When clicked, should toggle color of the entry
    if (parentIndex == undefined || currIndex == undefined || !$ctrl.localOfficeHours[parentIndex].value[currIndex].value)
      return false;
    else
      return true;
  }

  $ctrl.submitOfficeHours = function (newOfficeHours) {

  }

  // User.getAdminCourses().then(function(response) {
  //   $ctrl.courses = response.data;
  //   $ctrl.courses.forEach(course => {
  //     // TODO
  //   });
  // }
  // )
});