(function () {
    'use strict';
    angular.module('wikiApp', [
      'ui.router',
      'permission',
      'permission.ui',
      'ui.bootstrap',
      'toaster',
      'ngAnimate',
      'smart-table',
      //npm install ng-table --save (not in bower)
      'ngTable'
    ])
})();
