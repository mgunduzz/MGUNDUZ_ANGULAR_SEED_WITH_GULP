(function () {
    'use strict';

    angular
        .module('myApp')
        .config(config);

    /* @ngInject */
    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");
    }

})();
