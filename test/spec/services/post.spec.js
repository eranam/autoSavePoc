'use strict';

describe('Service Post:', function () {

  // load the service's module
  beforeEach(function () {
    module('autosavePocAppInternal');

    //add your mocks here
  });

  // instantiate service
  var Post, post;
  beforeEach(inject(function (_Post_) {
    Post = _Post_;

  }));

  it('should expose title', function () {
    var title = 'something';
    post = new Post(title);
    expect(post.title).toBe(title);
  });

  it('should expose body', function () {
    var title = 'something',
        content = 'eran';
    post = new Post(title, content);
    expect(post.body).toBe(content);
  });

  it('should expose lastSave initialized to null', function () {
    var title = 'something',
        content = 'eran';
    post = new Post(title, content);
    expect(post.lastSave).toBeNull();
  });

  it('should set lastSave to time of saving', function () {
    var title = 'something',
        content = 'eran';
    var beforeSave = new Date();
    post = new Post(title, content);
    post.save();
    var afterSave = post.lastSave;
    expect(afterSave.getTime()).not.toBeLessThan(beforeSave.getTime());
  });

});
