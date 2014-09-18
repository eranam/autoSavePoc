'use strict';

(function () {

  /* @ngInject */
  function postFactory() {
    function Post(title, content, lastSave) {
      if (!(this instanceof Post)) {
        return new Post(title, content, lastSave);
      }

      var that = this;

      this.lastSave = lastSave || null;

      function update(title, content) {
        that.title = title;
        that.body = content;
      }

      this.save = function () {
        this.lastSave = new Date();
      };

      update(title, content);
    }

    return Post;
  }

  angular
      .module('autosavePocAppInternal')
      .factory('Post', postFactory);

})();
