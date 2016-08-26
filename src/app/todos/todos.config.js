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
                templateUrl: 'app/todos/todo-list/todo-list.tmpl.html',
                controller: 'TodoListController',
                controllerAs: 'vm'
            });

    }

})();
