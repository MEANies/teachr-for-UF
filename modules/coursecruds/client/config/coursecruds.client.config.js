(function () {
  'use strict';

  angular
    .module('coursecruds')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Coursecruds',
      state: 'coursecruds',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'coursecruds', {
      title: 'List Coursecruds',
      state: 'coursecruds.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'coursecruds', {
      title: 'Create Coursecrud',
      state: 'coursecruds.create',
      roles: ['user']
    });
  }
}());
