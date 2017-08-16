(function () {
  'use strict';

  angular
    .module('wikiApp')
    .service('WikiUtils', WikiUtils);

    WikiUtils.$inject = [];

    var config = null;

    function WikiUtils() {
		    var service = {};
        service.isEmpty = isEmpty;
        service.isNotEmpty = isNotEmpty;
        service.isEqualsText = isEqualsText;
        service.textToNumber = textToNumber;
        return service;

		 function isEmpty (obj) {
       if (obj == undefined || obj == null ||
		            ((typeof (obj) == "string" ) && (obj.trim() == ''))) {
		            return true;
		   }
		   return false;
		 }//isEmpty

     function isNotEmpty (obj) {
       return !isEmptyObject(obj);
		 }//isNotEmpty

     function isEqualsText (s1, s2) {
       var string1 = new String(s1).valueOf();
	     var string2 = new String(s2).valueOf();
	     var result = (string1 == string2);
	     return result;
		 }//isEqualsText

     function textToNumber (s1, s2) {
        var bIsInvalid = isEmptyObject(s) || !isFinite(s);
	      if (bIsInvalid) {
	        return undefined;
	      } else if (typeof s === 'number') {
	        return s;
	      } else if (typeof s === 'string' && !isNaN(s)) {
	        return parseInt(s);
	      }
	      return undefined;
		 }//isEqualsText


	}//WikiUtils
})();
