(function () {
    'use strict';

    angular
        .module('directives')
        .factory('todoService', todoService);

    /* @ngInject */
    function todoService() {

        var currentTodo = {};
        var todoList = [{
          Name : 'todo1'
        },{
          Name : 'todo2'
        },{
          Name : 'todo3'
        },{
          Name : 'todo4'
        }];

        var service = {
            getTodos : getTodos
        };
        return service;

        ////////////
        function getTodos() {
            return todoList;
        }
    }
})();
