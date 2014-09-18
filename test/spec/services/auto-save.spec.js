'use strict';

describe('Service: autoSave', function () {

  // load the service's module
  beforeEach(function () {
    module('autosavePocAppInternal');

    //add your mocks here
  });

  // instantiate service
  var autoSave;
  beforeEach(inject(function (_autoSave_) {
    autoSave = _autoSave_;
  }));

});
