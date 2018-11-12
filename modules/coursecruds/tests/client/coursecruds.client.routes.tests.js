(function () {
  'use strict';

  describe('Coursecruds Route Tests', function () {
    // Initialize global variables
    var $scope,
      CoursecrudsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CoursecrudsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CoursecrudsService = _CoursecrudsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('coursecruds');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/coursecruds');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          CoursecrudsController,
          mockCoursecrud;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('coursecruds.view');
          $templateCache.put('modules/coursecruds/client/views/view-coursecrud.client.view.html', '');

          // create mock Coursecrud
          mockCoursecrud = new CoursecrudsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Coursecrud Name'
          });

          // Initialize Controller
          CoursecrudsController = $controller('CoursecrudsController as vm', {
            $scope: $scope,
            coursecrudResolve: mockCoursecrud
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:coursecrudId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.coursecrudResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            coursecrudId: 1
          })).toEqual('/coursecruds/1');
        }));

        it('should attach an Coursecrud to the controller scope', function () {
          expect($scope.vm.coursecrud._id).toBe(mockCoursecrud._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/coursecruds/client/views/view-coursecrud.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CoursecrudsController,
          mockCoursecrud;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('coursecruds.create');
          $templateCache.put('modules/coursecruds/client/views/form-coursecrud.client.view.html', '');

          // create mock Coursecrud
          mockCoursecrud = new CoursecrudsService();

          // Initialize Controller
          CoursecrudsController = $controller('CoursecrudsController as vm', {
            $scope: $scope,
            coursecrudResolve: mockCoursecrud
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.coursecrudResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/coursecruds/create');
        }));

        it('should attach an Coursecrud to the controller scope', function () {
          expect($scope.vm.coursecrud._id).toBe(mockCoursecrud._id);
          expect($scope.vm.coursecrud._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/coursecruds/client/views/form-coursecrud.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CoursecrudsController,
          mockCoursecrud;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('coursecruds.edit');
          $templateCache.put('modules/coursecruds/client/views/form-coursecrud.client.view.html', '');

          // create mock Coursecrud
          mockCoursecrud = new CoursecrudsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Coursecrud Name'
          });

          // Initialize Controller
          CoursecrudsController = $controller('CoursecrudsController as vm', {
            $scope: $scope,
            coursecrudResolve: mockCoursecrud
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:coursecrudId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.coursecrudResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            coursecrudId: 1
          })).toEqual('/coursecruds/1/edit');
        }));

        it('should attach an Coursecrud to the controller scope', function () {
          expect($scope.vm.coursecrud._id).toBe(mockCoursecrud._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/coursecruds/client/views/form-coursecrud.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
