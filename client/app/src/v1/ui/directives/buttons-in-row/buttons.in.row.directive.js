(function () {
    'use strict';

    angular
    .module('wikiApp')
    .directive('buttonsInRow', [buttonsInRow]);

    function buttonsInRow (){
        var directive = {};
        directive.restrict = 'E';
        directive.scope =  {data : '=', options : '='};
        directive.templateUrl = '/app/src/v1/ui/directives/buttons-in-row/buttons.in.row.directive.html';
        directive.replace = true;
        directive.link = buttonsInRowLinking; //Leval 3 function
        return directive;

        function buttonsInRowLinking (scope, element, attrs, ctrl){
            scope.applay = applay;

            function applay (btn) {
                return btn.action(scope.data);
            }

        }//End buttonsInRowLinking
    }//End buttonsInRow
})();
