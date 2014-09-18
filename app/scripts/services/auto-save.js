'use strict';

(function () {

  /* @ngInject */
  function AutoSave($timeout, $window) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var nextSaveTimer, saveCallback;
    var intervalMs = 300;

    function saveNow() {
      nextSaveTimer = undefined;
      saveCallback();
    }

    function stopPropagationAndScheduleSave(event) {
      event.stopPropagation();
      scheduleSave();
    }

    function scheduleSave() {
      if (nextSaveTimer === undefined) {
        nextSaveTimer = $timeout(saveNow, intervalMs);
      }
    }

    this.registerSavingFunc = function (saveFn) {
      saveCallback = saveFn;
      $window.addEventListener('input', stopPropagationAndScheduleSave);
    };

    this.cancel = function () {
      if (saveCallback) {
        $window.removeEventListener('input', stopPropagationAndScheduleSave);
        if (nextSaveTimer) {
          $timeout.cancel(nextSaveTimer);
          nextSaveTimer = undefined;
        }
        saveCallback = undefined;
      }
    };

    this.isSaving = function () {
      return nextSaveTimer !== undefined;
    };
  }

  angular
      .module('autosavePocAppInternal')
      .service('autoSave', AutoSave);

})();
