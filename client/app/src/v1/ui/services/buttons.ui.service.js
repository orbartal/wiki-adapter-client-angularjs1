(function () {
    'use strict';

    angular
        .module('wikiApp')
        .service('ButtonUiService', ButtonUiService);

    ButtonUiService.$inject = [];
    function ButtonUiService () {
        var service = {};
        service.get = get;
        return service;

        //TODO: make it more generalized. seperate by button type. Correct for now.
        function get (type, config){
            var arrBtn = [];
            for (var key in config) {
                var btn = getButton (key, config[key]);
                if (btn){
                    arrBtn.push(btn);
                }
            }
            return arrBtn;
        }

        function getButton (name, onPushButton){
            if (name==="create"){
                return getTopButton (name, 'glyphicon-plus', onPushButton);
            }else if (name==="view"){
                return getRowButton (name, 'glyphicon-eye-open', onPushButton);
            }else if (name==="update"){
                return getRowButton (name, 'glyphicon-pencil', onPushButton);
            }else if (name==="delete"){
                return getRowButton (name, 'glyphicon-trash', onPushButton);
            }
        }

        function getTopButton (title, glyphicon, onPushButton){
            var btnClass = ["btn", "btn-primary", "btn-xs", "class-round-button", "class-right"];
            return {"title": "create",
                    "buttonClass": btnClass,
                    "text" : "create",
                    "action": onPushButton,
                    "spanClass": ["glyphicon", glyphicon]
                };
        }

        function getRowButton (title, glyphicon, onPushButton){
            var btnClass = ["btn", "class-row-button", "class-right"];
            return {"title": title,
                    "buttonClass": btnClass,
                    "action": onPushButton,
                    "spanClass": ["glyphicon", glyphicon]
            };
        }
    }
})();
