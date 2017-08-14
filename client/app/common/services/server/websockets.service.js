(function () {
	'use strict';

	angular
	.module('app')
	.service('WebsocketsService', WebsocketsService);

	/* 
    	Service to get messages from server using WebSockets/SockJS
    	
    	Controllers should call subscribe upon init 
    	
	 */     
	function WebsocketsService($stomp, $q) {
		var vm = this;
		vm.isConnected = false;

		vm.subscribe = subscribe;
		vm.unsubscribe = unsubscribe;

		init();

		function init() {
// Comment this when not debugging			
//			$stomp.setDebug(function (args) {
//				console.log("stomp debug: "+args);
//			});

			// connect to /wikiserver endpoint in server to recieve messages 
			$stomp.connect('/wikiserver', {}).then(function (frame) {
				vm.isConnected = true;
			});
		};
		
		// call this from controller to subscribe to websocket events from server
		// @param {object} scope controller scope
		// @topic {string} websockets topic name
		// @onNewMsgFunction {function} function in controller to be called upon message received from topic
		// @return {promise} 
		function subscribe(scope, topic, onNewMsgFunction) {
			  return $q(function(resolve, reject) {
				var i = 0;
				
				// subscribe must be called only after connect completed
				// so we try every 1 second to subscribe for max of 10 retries
			    var intervalId = setInterval(function() {
			      if (vm.isConnected) {
			    	var subscription = $stomp.subscribe(topic, onNewMsgFunction, { headers: "my headers"});
			    	
			    	// register the controller scope onDestry event to unsubscribe
			    	if (scope != null) {
			    		scope.$on("$destroy", function() {
			    			unsubscribe(subscription);
			    		});
			    	}
			    	
			    	// stop periodic call
			    	clearInterval(intervalId);
			      } else if (i++ < 10) { // retry
			    	  console.log("WebsocketsService.subscribe called before connection established, retrying with retry number "+i);
			      } else {
			    	  // after 10 retries give up
			    	  console.log("WebsocketsService.subscribe called before connection established. giving up");
//			    	  reject("WebsocketsService.subscribe called before connection established. giving up");
			    	  clearInterval(intervalId);
			      }	
			    }, 1000);
			  });
			}

		function unsubscribe(subscription) {
			if (subscription)
				subscription.unsubscribe();
		};
	}
	
// Find a way to hook to destroy function of service and perform disconnect	
//	$stomp.disconnect(function () {
//
//	});

})();