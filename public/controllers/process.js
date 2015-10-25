(function() {
  "use strict";
  angular.module('MarsRobo').controller('process',process);

  function process($scope,$interval,RoboMove,$timeout) {
    

    $scope.output = new Array();
    $scope.gridObj = new Array();
    $scope.animation = true;
    $scope.refresh = function() {
    	//Clear the view
		$scope.maxX = "";
		$scope.maxY = "";
		$scope.output = new Array();
		$scope.gridObj = new Array();
		refreshInputView();
    }

    function refreshInputView() {
    	//clear only the input parameters for next command;
    	$scope.xCoord = "";
    	$scope.yCoord = "";
    	$scope.direction = "";
    	$scope.moves = "";
       	$('#dirBox').val("");
    	$scope.direction = "";
    }


    //This function is written to process input and update the output
    $scope.show = function() {
    	if ($scope.input_form.$valid && typeof($scope.direction) !== "undefined" && $scope.direction != "") {
    		if ($scope.xCoord > $scope.maxX || $scope.yCoord > $scope.maxY) {
    			alert("Invalid Coordinates");
    			return;
    		}
    		if (animationOn) {
    			alert("Animation is On. Please wait for a second and then press the button again.");
    			return;
    		}
    		if (RoboMove.getGridSize().x !== $scope.maxX || RoboMove.getGridSize().y !== $scope.maxY) {
		      	RoboMove.setGridSize($scope.maxX,$scope.maxY);
				$scope.output = new Array();  
				$scope.gridObj = new Array(); 		
    		}
    		RoboMove.setPosition($scope.xCoord, $scope.yCoord, $scope.direction);
			RoboMove.setMoves($scope.moves);
	    	var posObj = RoboMove.getPosition();
	    	posObj.status = (posObj.lost) ? "LOST" : "";
	    	posObj.iX = $scope.xCoord;
	    	posObj.iY = $scope.yCoord;
	    	posObj.iD = $scope.direction;
	    	posObj.moves = $scope.moves;
	    	$scope.output.push(posObj);
	    	//Start animation on the grid once we have the output.
	    	if ($scope.animation) {
	    		animate();	    		
	    	} else {
	    		$scope.gridObj = new Array();
	    	}

	    	//Clear the position parameters
			refreshInputView();	    	
	    } else {
	    	alert("Please enter input fields");
	      $scope.input_form.submitted = true;
	    }
    	
    }

    $('#dirList li').on('click', function(){
    	$('#dirBox').val($(this).text());
    	$scope.direction = ($(this).text());
	});

    /*--------------------------------Animation Logic-----------------------------------------*/
    
    //Defined few objects to retrieve class names in different conditions
    var dirClassMap = {N : 'arrow-up', E : 'arrow-right', W : 'arrow-left', S : 'arrow-down'};
    var dirChangeMap ={NE : '-rot-right',ES : '-rot-right',SW : '-rot-right', WN : '-rot-right', 
    NW : '-rot-left' , WS : '-rot-left', SE : '-rot-left',EN : '-rot-left'};
    var dirMoveClassMap = {N : 'arrow-up-vertical', E : 'arrow-right-horiz', W : 'arrow-left-horiz', S : 'arrow-down-vertical'};
    var animationOn = false;
    function animate(){
    	animationOn = true;
    	if ($scope.gridObj.length ===0) {
    		//To create the grid
    		for (var y=0; y < $scope.maxY + 1; y++) {
    			var rowObj = new Array();
    			for(var x=0; x < $scope.maxX + 1; x++) {
    				rowObj.push({class : ""});
    			}
    			$scope.gridObj.push(rowObj);
    		}
    	} else {
    		//Reset the classes in grid
    		for (var y=0; y < $scope.gridObj.length;y++) {
    			for (var x=0; x< $scope.gridObj[y].length; x++) {
    				($scope.gridObj[y])[x].class = "";
    			}
    		}
    	}
    	//Set the class name for the first position
    	($scope.gridObj[$scope.maxY - $scope.yCoord])[$scope.xCoord].class = dirClassMap[$scope.direction];

    	//Based upon Robot moves, update the arrow positions
    	var posRecord = RoboMove.getPositionRecord();
    	var oldX = $scope.xCoord;
    	var oldY = $scope.yCoord;
    	var oldDir = $scope.direction;
    	var i = 0;
    	var iObj = $interval(function() {
        	if (i >= posRecord.length) {
    			$interval.cancel(iObj);
    			animationOn = false;
	      		return;	
	      	}
	    	var newX = posRecord[i].x;
	    	var newY = posRecord[i].y;
	    	var newDir = posRecord[i].d;
	    	var lost = posRecord[i].lost;
	    	if(lost) {
	    		($scope.gridObj[$scope.maxY - newY])[newX].gridcolor = "grid-item-scented";
	    		$interval.cancel(iObj);
	    		($scope.gridObj[$scope.maxY - newY])[newX].class = dirMoveClassMap[newDir];
	    		$timeout(function() {
	    			($scope.gridObj[$scope.maxY - newY])[newX].class = "";
	    			animationOn = false;
	    		}, 800);
	    	} else {
	    		updateClass(oldX,oldY,oldDir,newX,newY,newDir);
	    		oldX = newX;
	    		oldY = newY;
	    		oldDir = newDir;
	    	}
    		i++;    			
    		
    	}, 1000);

    }

    function updateClass(oldX,oldY,oldDir,newX,newY,newDir) {
	    var className = ($scope.gridObj[$scope.maxY - oldY])[oldX].class;
		if (newX !== oldX) {
			className = className + "-horiz";
		} else if (newY !== oldY) {
			className = className + "-vertical";
		} else if (newDir !== oldDir) {
			className = className + dirChangeMap[oldDir+newDir];
		}
		($scope.gridObj[$scope.maxY - oldY])[oldX].class = className;    	
		$timeout(function() {
	    	($scope.gridObj[$scope.maxY - oldY])[oldX].class = "";
	    	($scope.gridObj[$scope.maxY - newY])[newX].class = dirClassMap[newDir];    		
		}, 800);

    }

  }
  process.$inject = ['$scope','$interval','RoboMove','$timeout'];

})();