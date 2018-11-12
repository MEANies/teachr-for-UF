(function () {
  'use strict';

  angular
    .module('coursecruds')
    .controller('CoursecrudsListController', CoursecrudsListController);

  CoursecrudsListController.$inject = ['CoursecrudsService'];

  function CoursecrudsListController(CoursecrudsService) {
    var vm = this;

    vm.coursecruds = CoursecrudsService.query();
  }
}());
