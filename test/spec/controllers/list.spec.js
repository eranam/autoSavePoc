'use strict';

describe('Controller: ListController', function () {

  // load the controller's module
  beforeEach(function () {
    module('autosavePocAppInternal');

    //add your mocks here
  });

  var ListController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListController = $controller('ListController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the controller', function () {
    expect(ListController.posts.length).toBe(2);
  });
});
