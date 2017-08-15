(function () {
    'use strict';

    //http://ng-table.com/#/editing/demo-inline
      angular
            .module('wikiApp')
            .directive('filesTable', ['SiteConfigService', '$uibModal', '$state', 'toaster', 'NgTableParams', filesTable]);

      function filesTable (SiteConfigService, $uibModal, $state, toaster, NgTableParams){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {data : '=', options : '='};
            directive.templateUrl = '/app/common/directives/files-table/files.table.html';
            directive.replace = true;
            directive.controller = filesTableController;  //Leval 1 function
            directive.compile = filesTableCompile; //Leval 2 function
            directive.link = filesTableLinking; //Leval 3 function
            return directive;


	      function filesTableController($scope){}

	      // function is executed once (1) for every instance of ui-jq in your original UNRENDERED template.
	      // Scope is UNAVAILABLE as the templates are only being cached. updatehour()
	      function filesTableCompile (element, attributes){
	            return this.link;
	      }

	      // Function is executed once (1) for every RENDERED instance.
	      // Scope IS available because controller logic has finished executing.
	      // All variables and expression values can finally be determined.
	      function filesTableLinking (scope, element, attrs, ctrl){
	    	  scope.onView = onView;
	    	  scope.openAddNewFileDialog = openAddNewFileDialog;

	    	  init();

	    	  function init() {
	    		  	scope.config = SiteConfigService.getSiteConfig();
		          	setStyle();
	          		scope.$watch('data', createSmartTable);
	          		scope.$watch('options', createSmartTable);
	          }

	          function setStyle (){
		          	setTableButtonStyle ();
		          	setRowButtonsStyle ();
		          	scope.tableHeaderStyle = {};
		          	scope.fieldStyle = {};
		          	scope.tableHeaderStyle["font-weight"] = "bold";
		          	if (scope.config.isRtl){
		          		scope.fieldStyle["text-align"] = "right";
		          		scope.tableHeaderStyle["text-align"] = "right";
		          	}else{
		          		scope.fieldStyle["text-align"] = "left";
		          		scope.tableHeaderStyle["text-align"] = "left";
		          	}
	          }

	          function setTableButtonStyle (){
		          	scope.tableButtonClass = ["btn", "btn-primary", "btn-xs", "class-round-button"];
		          	if (scope.config.isRtl){
		          		scope.tableButtonClass.push("pull-right");
		          	}else{
		          		scope.tableButtonClass.push("pull-left");
		          	}
	         }

	    	  function setRowButtonsStyle (){
		          	scope.rowButtonClass =["btn", "class-row-button"];
		          	if (scope.config.isRtl){
		          		scope.rowButtonClass.push("class-right");
		          	}else{
		          		scope.rowButtonClass.push("class-left");
		          	}
	          }

	          function createSmartTable(){
             if (!scope.data){
                 return;
             }
	        	 initializeOptions();
        		 scope.tableParams = new NgTableParams(scope.options.initialSettings, { data: scope.data});
        		 scope.tableParams.data = scope.data;
	          }

	          function initializeOptions (){
		  	    	if (!scope.options){
		  	    		scope.options = {};
		  	    	}
		  	    	if (!scope.options.tableCols){
		  	    		scope.options.tableCols = getTableDefualtCols();
		  	    	}
		  	    	if (!scope.initialSettings){
		  	    		scope.options.initialSettings = {
		  	    				count: 10,
		  	    				sorting: { datetime: "desc" }
		  	    		};
		  	    	}
		  	    	if (!scope.options.getDisplayProperty ){
		  	    		scope.options.getDisplayProperty = getDisplayProperty;
		  	    	}
	  	      }

	  	      function getTableDefualtCols (){
  	        	 var lang = scope.config.mapLanguage;
  	        	 var tableCols =  [
                    { field: "name", title: lang.name, sortable: "name", filter: {name: "text" }, show: true},
                    { field: "type", title: "type", sortable: "type", filter: {type: "text" }, show: true},
                    { field: "extension", title: "extension", sortable: "extension", filter: {extension: "text" }, show: true},
                    { field: "versionTime", title: lang.datetime, show: true, sortable: "versionTime"},
                    { field: "actions", title: "actions", show: true}
	             ];
  	        	 return tableCols;
	  	       }

	  	       function getDisplayProperty (file, col){
		  	    	  if (col.property==true){
		  	    		  var mapPropertyToValue = file.mapPropertyToValue;
		  	    		  var peoperty = mapPropertyToValue[col.field];
		  	    		  var result = "";
		  	    		  if (peoperty){
		  	    			  result = peoperty.value;
		  	    		  }
		  	    		  return result;
		  	    	  }
		  	    	  return file[col.field];
		  	   }//End getDisplayProperty

	  	     function openAddNewFileDialog () {
		          	var modalInstance = $uibModal.open({
		          		backdrop : 'static',
		  				size: "lg",
		  				templateUrl: '/app/pages/files/modal/create/modal.add.new.file.html',
		  				controller: "ModalAddNewFileController as vm",
		  			});

		          	modalInstance.result.then(onConfirm, onCancel);

		  			function onConfirm(data){
		  				modalInstance.close();
		  				toaster.success({
		  					title: "successfully upload a new file to the wiki",
		  					body:"file="+data.name
		  				});
		  			}

		  			function onCancel (data){}
	 	  }

	  	     function onView (file){
	  	    	 var params = {name : file.name};
		         if (file.isActive==false){
		        	 params['history']=file.isActive;
		          	 params['versionTime']=file.versionTime;
		         }
		         $state.go('site.file-view', params);
	  	       }
	      }//End articlesTableLinking
      }//End articlesTable
})();
