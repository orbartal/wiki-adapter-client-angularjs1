//http://jsfiddle.net/NWZZE/6/
(function () {
    'use strict';

    angular
        .module('wikiApp')
        .directive('compile', ['$compile', compile]);

    function compile ($compile){
        var directive = {};
        directive.restrict = 'A';
        directive.replace = true;
        directive.link = compileLinking; //Leval 3 function
        return directive;

        function compileLinking(scope, element, attrs, ctrl){
            scope.$watch(watchFun, onSourceChange);

            // watch the 'compile' expression for changes
            function watchFun (scope) {
                return attrs.compile;
            }

            function onSourceChange(value) {
                // when the 'compile' expression changes assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current scope.
                // NOTE: we only compile .childNodes so that
                // 	   we don't get into infinite loop compiling ourselves
                var contents = element.contents();
                $compile(contents)(scope);
            }//End watchFun2
        }//End compileLinking
    }//End compile
})();
