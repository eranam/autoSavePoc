'use strict';

//add services, directives, controllers, filters, etc. in this module
//avoid adding module dependencies for this module
angular
    .module('autosavePocAppInternal', [])
    .constant('urls', {
      getPosts: 'http://localhost:3000/posts',
      updatePost: 'http://localhost:3000/updatePost'
    });

//add module dependencies & config and run blocks in this module
//load only the internal module in tests and mock any module dependency
//the only exception to load this module in tests in to test the config & run blocks
angular
    .module('autosavePocApp', ['autosavePocAppInternal', 'autosavePocTranslations', 'wixAngular', 'ui.router', 'ui.bootstrap', 'ui.utils'])
    .config(function ($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.when('/#/', '');
      $urlRouterProvider.when('/', '');
      $urlRouterProvider.when('/', '');
      $urlRouterProvider.otherwise('/list');
      $stateProvider
          .state('list', {
            templateUrl: 'views/main.html'
          })
    });
