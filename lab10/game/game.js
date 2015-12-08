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
	var blocks = $$(".block");
	for (var i = 0; i < numberOfBlocks; i++) {
		blocks[i].removeClassName("target");
		blocks[i].removeClassName("selected");
		blocks[i].stopObserving("click");
	}
}

function startToSetTarget(){
	clearTimeout(timer);
	var rn;
	targetBlocks = [];
	selectedBlocks = [];
	var allblocks = $$(".block");
	var i;
	$("state").textContent = "Ready!";
	for(i=0;i<numberOfTarget;i++){
		while(targetBlocks.indexOf(rn = Math.floor(Math.random() * allblocks.length)) != -1);
		targetBlocks[i] = rn;
	}
	timer = setTimeout(setTargetToShow,interval);
}

function setTargetToShow(){
	clearTimeout(timer);
	$("state").textContent = "Memorize!";
	var blocks = $$(".block");
	for(var i=0;i<targetBlocks.length;i++){
		blocks[targetBlocks[i]].addClassName("target");
	}
	timer = setTimeout(showToSelect,interval);
}

function showToSelect(){
	clearTimeout(timer);
	var i;
	var index = [];
	$("state").textContent = "Select!";
	var blocks = $$(".block");
	for(i=0;i<numberOfTarget;i++){
		blocks[targetBlocks[i]].removeClassName("target");
	}
	for(var i=0;i<numberOfBlocks;i++){
		blocks[i].observe("click",function(){
			if(selectedBlocks.length == 3) return;
			selectedBlocks.push(this.readAttribute('data-index'));
			this.addClassName("selected");
			this.stopObserving("click");
			});
	}
	timer = setTimeout(selectToResult,interval);
}

function selectToResult(){
	clearTimeout(timer);
	var correct = 0;
	$("state").textContent = "Checking";
	var blocks = $$(".block");
	for(var i = 0; i < selectedBlocks.length; i++){
		blocks[selectedBlocks[i]].removeClassName("selected");
	}
	for(var i = 0; i < numberOfBlocks; i++){
		blocks[i].stopObserving("click");
	}
	for(var i = 0; i < numberOfTarget; i++){
		for(var j = 0; j < numberOfTarget; j++){
			if(selectedBlocks[i] == targetBlocks[j]){
				correct++;
			}
		}
	}
	var current_answer = $("answer").innerHTML;
	var display = current_answer.split("/");
	$("answer").textContent = (parseInt(display[0]) + correct) + "/" + (parseInt(display[1]) + numberOfTarget);
	timer = setInterval(startToSetTarget, interval);
}