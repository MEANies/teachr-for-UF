angular.module('directoryApp').controller('DetailsInstanceController', function ($rootScope, User, Auth, Courses) {
  var $ctrl = this;
  $ctrl.test = 'test';

  $ctrl.myCourse = [{
    code: 'CEN3031',
    name: 'Introduction to Software Engineering'
  }]

  $ctrl.localOfficeHours = [
    {
      key: 3,
      value: [
        {
          key: 3,
          value: true
        }
      ]
    }
  ];

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

  $ctrl.checkCellState = function (parent, index) {

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

  $ctrl.getCurrentResearch = function () {
    User.getResearch({ username: User.getUser() }).then(function (res) {
      console.log('hello', res)
      $ctrl.currentdetail = res.data.detail;
      $ctrl.currenthour = res.data.hour;
    })
  }

  $ctrl.getSocial = function () {
    User.getSocial({ username: User.getUser() }).then(function (res) {
      $ctrl.currenttwitter = res.data.twitter
      $ctrl.currentlinkedin = res.data.linkedin
    })
  }

})