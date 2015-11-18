var interval = 3000;
var numberOfBlocks = 9;
var numberOfTarget = 3;
var targetBlocks = [];
var selectedBlocks = [];
var timer;

document.observe('dom:loaded', function(){
	$("start").observe("click",stopToStart);
	$("stop").observe("click",stopGame);
});

function stopToStart(){
    stopGame();
    startToSetTarget();
}

function stopGame(){
	$("state").textContent = "Stop";
	$("answer").textContent = "0/0";
	clearTimeout(timer);
	timer = null;
	targetBlocks = [];
	selectedBlocks = [];
}

function startToSetTarget(){
	targetBlocks = [];
	selectedBlocks = [];
	var allblocks = $$(".block");
	var i;
	$("state").textContent = "Ready!";
	for(i=0;i<numberOfTarget;i++){
		var rn = Math.floor(Math.random() * allblocks.length);
		targetBlocks[i] = allblocks.splice(rn, 1);
		targetBlocks[i] = targetBlocks[i][0];
	}
	
	timer = setTimeout(setTargetToShow,interval);
}

function setTargetToShow(){
	$("state").textContent = "Memorize!";
	console.log(targetBlocks);
	for(var i=0;i<targetBlocks.length;i++){
		targetBlocks[i].addClassName("target");
	}
	timer = setTimeout(showToSelect,interval);
}

function showToSelect(){
	var i;
	var index = [];
	$("state").textContent = "Select!";
	for(i=0;i<targetBlocks.length;i++){
		targetBlocks[i].removeClassName("target");
	}
	var allblocks = $$(".block");
	for(var i=0;i<numberOfBlocks;i++){
		allblocks[i].observe("click",function(){
			if(selectedBlocks.length == 3 || index.indexOf(this.readAttribute('data-index')) != -1) return;
			index.push(this.readAttribute('data-index'));
			this.addClassName("selected");
			selectedBlocks.push(this);
			});
	}

	timer = setTimeout(selectToResult,interval);
}

function selectToResult(){
	$("state").textContent = "Checking";
	//$("blocks").observe("click",function(){});
	for(var i=0;i<selectedBlocks.length;i++){
		selectedBlocks[i].removeClassName("selected");

	}

	timer = setTimeout(startToSetTarget,interval);
}