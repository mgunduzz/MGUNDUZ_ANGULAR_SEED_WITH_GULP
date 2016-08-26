(function () {
    'use strict';

    angular
        .module('directives')
        .directive('mgTodo', mgTodo);

    /* @ngInject */
    function mgTodo() {
        var directive = {
            transclude: true,
            restrict: 'E',
            scope: {
                todo:'='
            },
            link: link,
            templateUrl: 'app/components/directives/todo/todo.directive.tmpl.html'
        };
        return directive;


        function link(scope) {

            scope.vm = {};

            scope.vm.todo = scope.todo;

        }
    }
})();
