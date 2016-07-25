(function () {

    'use strict';

    angular
        .module('myApp.todos')
        .config(moduleConfig);

    /* ngInject */
    function moduleConfig($stateProvider) {


        $stateProvider
            .state('todos', {
                url: '/',
                templateUrl: 'src/todos/todo-list/todo-list.tmpl.html',
                controller: 'TodoListController',
                controllerAs: 'vm'
            });

    }

})();
