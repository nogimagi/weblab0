/* CSE3026 : Web Application Development
 * Lab 9 - Maze
 * 
 */
"use strict";
var loser = null;  // whether the user has hit a wall
var finish = null;

window.onload = function() {
	$("start").onclick = startClick;
	$("end").onmouseover = overEnd;
};

// called when mouse enters the walls; 
// signals the end of the game with a loss
function overBoundary(event) {
	if (!finish) {
		loser = true;
		$("status").textContent = "You lose! :(";
		var boundaries = $$(".boundary");
		for(var i = 0; i < boundaries.length; i++){
			boundaries[i].addClassName("youlose");
		}	
	}
}

// called when mouse is clicked on Start div;
// sets the maze back to its initial playable state
function startClick() {
	loser = false;
	finish = false;
	$("status").textContent = "Click the \"S\" to begin.";
	var boundaries = $$(".boundary");
	for(var i = 0; i < boundaries.length; i++){
		boundaries[i].onmouseover = overBoundary;
		boundaries[i].removeClassName("youlose");
	}
	$$("body")[0].onmouseover = overBody;
}

// called when mouse is on top of the End div.
// signals the end of the game with a win
function overEnd() {
	if(!loser && loser !== null){
		finish = true;
		$("status").textContent ="You win! :)";
	}
}

// test for mouse being over document.body so that the player
// can't cheat by going outside the maze
function overBody(event) {
	if(event.srcElement.tagName == "BODY"){
		overBoundary();
	}
}