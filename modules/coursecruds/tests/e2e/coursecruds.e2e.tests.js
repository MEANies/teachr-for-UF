'use strict';

describe('Coursecruds E2E Tests:', function () {
  describe('Test Coursecruds page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/coursecruds');
      expect(element.all(by.repeater('coursecrud in coursecruds')).count()).toEqual(0);
    });
  });
});
