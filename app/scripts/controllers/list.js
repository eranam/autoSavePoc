'use strict';

(function () {

  /* @ngInject */
  function ListController($scope, Post, $http, $log, urls, $window, autoSave) {
    var that = this;

    this.saveCounter = 0;

    function logError(body, code) {
      $log.error('Shit! request returns with: ' + code);
    }

    function getPostsFromServer() {
      return $http.get(urls.getPosts)
          .success(function (res) {
            that.posts = (res.posts || []).map(function (postObj) {
              var post = JSON.parse(postObj.post);
              return {
                id: postObj.id,
                post: Post(post.title, post.body, post.lastSave)
              };
            });
            $log.log('OK: Load ' + res.posts.length + ' posts from server.');
          })
          .error(logError);
    }

    function randomTitle() {
      function randomId() {
        return Math.floor(Math.random() * 10000);
      }

      return "Untitled_" + randomId();
    }

    function updatePost(postId, post) {
      return $http.get(urls.updatePost, {params: {id: postId, post: post}})
          .success(function () {
            $log.log('OK: save update for post: ' + postId + ' (' + post.title + ')');
          })
          .error(logError);
    }

    this.posts = [
      {id: 1, post: Post('post1', 'defaultContent')},
      {id: 2, post: Post('post2', 'defaultContent2')}
    ];

    $scope.edit = {};

    this.goToUpdate = function (postObj) {
      autoSave.registerSavingFunc(save);
      $scope.edit.id = postObj.id;
      $scope.edit.post = angular.copy(postObj.post);
    };

    function save() {
      that.saveCounter++;
      $scope.edit.post.save();
      updatePost($scope.edit.id, $scope.edit.post);
    }

    this.closeEdit = function () {
      autoSave.cancel();
      getPostsFromServer()['finally'](function (){
        $scope.edit = {};
      });
    };

    this.savingAnimation = autoSave.isSaving;
    this.init = function () {
      this.saveCounter = 0;
      getPostsFromServer();
      $window.addEventListener('keydown', function (event) {
        if (event.which == 27) {
          that.closeEdit();
        }
      })
    }

  }

  angular
      .module('autosavePocAppInternal')
      .controller('ListController', ListController);

})();
