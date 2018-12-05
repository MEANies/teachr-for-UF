angular.module('directoryApp').controller('EditController',
  function ($rootScope, $uibModal, $state, $stateParams, $window, User) {

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

angular.module('directoryApp').controller('EditModalInstanceController', function ($uibModalInstance, User, $timeout, Courses, Auth) {
  var $ctrl = this;
  //search courses
  var mycoursecode;

  // $ctrl.myCourse = function() {
  //   $ctrl.
  // }

  User.getUser(Auth.getUser()).then(function (res) {
    mycoursecode = res.data.courses
  })

  //show my course
  $ctrl.showMyCourses = function() {
    let result = []
    mycoursecode.forEach(function(course) {
      Courses.getByCode(course, 2188).then(function(res) {
        result.push(res.data[0]);
      }, function(err) {
        console.log('my course load fail');
      });
    });
    $ctrl.myCourse = result;
  }

  $ctrl.ok = function () {
    $uibModalInstance.close('Closed');
  };

  $ctrl.cancel = function () {
    console.log("Debug: Edit Modal Canceled");
    $uibModalInstance.dismiss('home');
  };

  $ctrl.localOfficeHours = [];

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

//get current info
  $ctrl.getCurrentResearch = function() {
    User.getResearch({ username: User.getUser() }).then(function(res) {
      console.log('hello',res)
      $ctrl.currentdetail = res.data.detail;
      $ctrl.currenthour = res.data.hour;
    })
  }
  
  $ctrl.updateResearch = function() {
    $ctrl.rscUpdateFail = false;
    $ctrl.rscUpdateSuc = false;
    let data = {
      username: User.getUser(),
      research: {
        hour: $ctrl.hour,
        detail: $ctrl.detail
      }
    }
    User.updateResearch(data).then(function(res) {
      console.log('success update')
      $ctrl.rscUpdateSuc = true;
      $uibModalInstance.dismiss('edit')
    }, function(err) {
      console.log(err)
      $ctrl.rscUpdateFail = true;
    });
  }

  $ctrl.getSocial = function() {
    User.getSocial({username: User.getUser()}).then(function(res) {
      $ctrl.currenttwitter = res.data.twitter
      $ctrl.currentlinkedin = res.data.linkedin
    })
  }

  //edit social media account
  $ctrl.updateSocial = function() {
    $ctrl.smUpdateFail = false;
    $ctrl.smUpdateSuc = false;
    let data = {
      username: User.getUser(),
      social: {
        twitter: $ctrl.twitter,
        linkedin: $ctrl.linkedin
      }
    };
    User.updateSocial(data).then(function(res) {
      $uibModalInstance.dismiss('edit')
      $ctrl.smUpdateSuc=true;
    }), function(err) {
      $ctrl.smUpdateFail = true;
    }
  }
});