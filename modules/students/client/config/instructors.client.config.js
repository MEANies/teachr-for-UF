(function () {
  'use strict';

  angular
    .module('instructors')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Instructors',
      state: 'instructors',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'instructors', {
      title: 'List Instructors',
      state: 'instructors.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'instructors', {
      title: 'Create Instructor',
      state: 'instructors.create',
      roles: ['user']
    });
  }
}());
