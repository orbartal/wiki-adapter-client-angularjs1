(function () {
    'use strict';

      angular
            .module('wikiApp')
            .directive('jobProgressBar', ['$timeout', 'toaster', 'JobsDataService', 'WikiUtils', jobProgressBar]);

      function jobProgressBar ( $timeout, toaster, JobsDataService, WikiUtils){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {data : '=', options : '='};
            directive.templateUrl = '/app/src/v1/ui/directives/job-progress-bar/job.progress.bar.directive.html';
            directive.replace = true;
            directive.link = jobProgressBarLinking;
            return directive;

            function jobProgressBarLinking (scope, element, attrs, ctrl){
              //Variables
  	    	  scope.progressStyle = {width : scope.nowValue + '%' };
  	    	  scope.startTime = null ;
	    	  scope.endTime = null ;
	    	  scope.data.finished = false;
	    	  scope.lastErrorTime = 0;
	    	  scope.minValue = 0 ;
	    	  scope.maxValue = 100;
	    	  scope.nowValue = 0;

	    	  //Methods
	    	  scope.getStartTime = getStartTime;
	    	  scope.getEndTime = getEndTime;
	    	  scope.getDurationTime = getDurationTime;

	    	  setInterval(updateValue, 1000);

	    	  function getStartTime (){
	    		  if (!scope.startTime){
	    			  return '';
	    		  }
	    		  var time = WikiUtils.miliToHHmmss(scope.startTime);
	    		  return time;
	    	  }

	    	  function getEndTime (){
	    		  if (!scope.endTime){
	    			  return '';
	    		  }
	    		  var time = WikiUtils.miliToHHmmss(scope.endTime);
	    		  return time;
	    	  }

	    	  function getDurationTime (){
	    		  return WikiUtils.getDurationTime(scope.startTime, scope.endTime);
	    	  }

	    	  function updateValue () {
	    		  if (!scope.options || !scope.data || !scope.data.jobId || scope.data.jobId<0 || scope.data.finished){
	    			  return;
	    		  }else if (scope.nowValue==scope.maxValue){
	    			  scope.data.finished = true;
	    			  return;
	    		  }
	    		  JobsDataService.getProgress(scope.data.jobId).then(onSuccess, onFailure);

	    		  function onSuccess(result) {
	    			  $timeout(updateBar);

	    			  function updateBar(){
	    				  scope.startTime = result.startTime;
	    				  scope.endTime = result.endTime;
	    				  scope.nowValue = result.value;
			    		  if (scope.nowValue>scope.maxValue || scope.nowValue<scope.minValue){
			    			  scope.nowValue = 0;
			    		  }else if (scope.nowValue==scope.maxValue){
			    			  scope.data.finished = true;
			    		  }
				    	  scope.progressStyle['width'] = scope.nowValue + '%';
	    			  }
	    	      }

	    	      function onFailure(error) {
	    	    	    var currentTime = new Date().getTime();
	    	    	    var currentTimeMago = currentTime - 60*1000 ;
	    	    	  	if (scope.lastErrorTime<currentTimeMago){
	    	    	  		scope.lastErrorTime = currentTime;
	    	    	  		toaster.error({
			           			title: 'Error',
			   	                body: 'Failed to get job due to error: ' + error.message
		   	            	});
	    	    	  	}
	    	      }
	    	  }
	      }//End jobIdProgressBarLinking
      }//End jobIdProgressBar
})();
