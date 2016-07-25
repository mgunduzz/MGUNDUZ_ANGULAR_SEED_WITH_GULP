(function () {
    'use strict';

    angular
        .module('myApp', [
            'ngMaterial','ui.router', 'ngAnimate',

            'myApp.todos',
            'myApp.version'

        ]);
})();
