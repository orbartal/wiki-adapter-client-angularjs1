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

        service.getValues = getValues;
        service.miliToHHmmss = miliToHHmmss;
        service.getDurationTime = getDurationTime;
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
	}

    function getValues (data) {
		var arrValues = [];
		var arrKeys = Object.keys(data);
		for (var i = 0; i < arrKeys.length; i++) {
			var key = arrKeys[i];
			arrValues.push(data[key]);
		}
		return arrValues;
	}

	function miliToHHmmss (milli){
		  var time = new Date(milli);
		  var hours = time.getHours();
		  hours = (hours - 2)%24;
		  if (hours<10){
			  hours = '0'+hours;
		  }
		  var minutes = time.getMinutes();
		  if (minutes<10){
			  minutes = '0'+minutes;
		  }
		  var seconds = time.getSeconds();
		  if (seconds<10){
			  seconds = '0'+seconds;
		  }
		  var milliseconds = time.getMilliseconds();
		  var result = hours + ":" + minutes + ":" + seconds; // + '.'+milliseconds;
		  return result;
	}

	function getDurationTime (nStart, nEnd){
		  var end;
		  if (!nStart){
			  return 'Error: no start time';
		  }
		  if (!nEnd){
			  nEnd = new Date().getTime();
		  }
		  var miliDuration =  nEnd-nStart;
		  var time = service.miliToHHmmss(miliDuration);
		  return time;
	}


	}//WikiUtils
})();
