(function () {

    'use strict';

    angular
        .module('myApp.todos')
        .controller('TodoListController', TodoListController);

    /* @ngInject */
    function TodoListController(todoService) {
        var vm = this;

        vm.todos = todoService.getTodos();
    }
})();
