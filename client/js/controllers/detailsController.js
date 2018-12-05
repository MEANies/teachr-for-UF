angular.module('directoryApp').controller('DetailsInstanceController', function ($rootScope, User, Auth, Courses) {
  var $ctrl = this;
  $ctrl.test = 'test';

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

  $ctrl.getCurrentResearch = function() {
    User.getResearch({ username: User.getUser() }).then(function(res) {
      console.log('hello',res)
      $ctrl.currentdetail = res.data.detail;
      $ctrl.currenthour = res.data.hour;
    })
  }

  $ctrl.getSocial = function() {
    User.getSocial({username: User.getUser()}).then(function(res) {
      $ctrl.currenttwitter = res.data.twitter
      $ctrl.currentlinkedin = res.data.linkedin
    })
  }
  
})