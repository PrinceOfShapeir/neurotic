//this version has two versions of the network play each other


const fs = require('fs');
var synaptic = require('synaptic');
var ACME = require('./ACMEMKI.js'); //my handy js toolkit
var wins = require('./ticwin.js'); //contains wincheck
var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;


//next iteration will include dynamic training for any n*n grid

function Perceptron(input, hidden, output){

	var inputLayer = new Layer(input);
	var hiddenLayer = new Layer(hidden);
	var outputLayer = new Layer(output);
	
	inputLayer.project(hiddenLayer);
	hiddenLayer.project(outputLayer);

	this.set({
		input: inputLayer,
		hidden: [hiddenLayer],
		output: outputLayer
	});



}

Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

//var ticTacPlayer = new Perceptron(9,18,1);


var trainSet = [

{
input: [1,1,1,.5,.5,.5,.5,.5,.5], //top row match
output: [1]
},
{
input: [.5,.5,.5,1,1,1,.5,.5,.5], //middle row match
output: [1]
},
{input: [.5,.5,.5,.5,.5,.5,1,1,1], //bottom row match
output: [1]
},

{
	input:[1,.5,.5,1,.5,.5,1,.5,.5,], //left column
	output: [1]
},


{
	input: [.5,1,.5,.5,1,.5,.5,1,.5], //middle column
	output: [1]
},

{
	input: [.5,.5,1,.5,.5,1,.5,.5,1], //right column
	output: [1]
},

{
	input: [1,.5,.5,.5,1,.5,.5,.5,1], // \ diag
	output: [1]
},

{
	input: [5,.5,1,.5,1,.5,1,.5,.5], // / diag
	output: [1]
},

{ input: [.5,.5,.5,.5,1,.5,.5,.5,.5],
	output: [1]	
}

]

var mustSet = [{ input: [.5,.5,.5,.5,1,.5,.5,.5,.5],
	output: [1]	
}];

var mustSetInit = [.5,.5,.5,.5,1,.5,.5,.5,.5];

for(let i = 0; i<8; i++){
	
	
	mustSetInit.push(mustSetInit.shift());

	mustSet.push({
		
		input: mustSetInit,
		output: [0]
		
	}
	);
	
	
}

var winningSet = [[1,0,0.5,0,1,0.5,0.5,0.5,1],[1,0.5,0.5,1,0,0.5,1,0,0],[1,0,0.5,0.5,1,0.5,0,0.5,1],[1,0,0.5,0,1,0.5,0.5,0.5,1],[1,0,0.5,1,0,0.5,1,0.5,0],[1,1,1,0,0,0.5,0.5,0,0.5],[1,0,0.5,0.5,1,0.5,0,0.5,1],[1,0.5,0,0.5,1,0.5,0,0.5,1],[1,0,0,0.5,1,0.5,0.5,0.5,1],[0.5,1,0.5,0,1,0.5,0,1,0.5],[1,0.5,0,1,0,0.5,1,0,0.5],[1,0.5,0.5,1,0,0.5,1,0,0],[1,1,1,0,0,0.5,0,0.5,0.5],[0.5,1,0,0.5,1,0.5,0.5,1,0],[0,0.5,0,0.5,0,0.5,1,1,1],[0.5,1,0,0.5,1,0.5,0,1,0.5],[0,0,1,0.5,1,0.5,1,0.5,0.5],[1,1,1,0.5,0,0.5,0,0,0.5],[1,0,0.5,0,1,0.5,0.5,0.5,1],[0.5,1,0.5,0,1,0.5,0,1,0.5],[1,0.5,0,0,1,0.5,0.5,0.5,1],[0.5,1,0,0.5,1,0.5,0,1,0.5],[1,1,1,0,0,0.5,0.5,0.5,0],[0,1,0.5,0,1,0.5,0.5,1,0.5],[0,0.5,1,0.5,1,0.5,1,0,0.5],[0,0,1,0.5,1,0.5,1,0.5,0.5],[1,1,1,0,0,0.5,0,0.5,0.5],[1,0,0.5,1,0,0.5,1,0.5,0],[0,0.5,1,0.5,1,0.5,1,0.5,0],[0.5,0.5,0,0,0,0.5,1,1,1],[0,0.5,1,0.5,1,0.5,1,0,0.5],[1,0.5,0,0.5,1,0.5,0.5,0,1],[0.5,1,0.5,0.5,1,0.5,0,1,0],[0,0.5,0.5,0,0,0.5,1,1,1],[1,0,0.5,1,0,0.5,1,0.5,0],[0,0.5,1,0.5,1,0.5,1,0,0.5],[0,0.5,1,0,1,0.5,1,0.5,0.5],[0.5,1,0.5,0,1,0.5,0.5,1,0],[1,0,0.5,0.5,1,0.5,0,0.5,1],[1,0.5,0.5,1,0,0.5,1,0,0],[0.5,1,0,0.5,1,0.5,0.5,1,0],[0.5,0,0.5,0,0,0.5,1,1,1],[0.5,0,1,0,1,0.5,1,0.5,0.5],[0.5,1,0,0.5,1,0.5,0,1,0.5],[0,0.5,0.5,0,0,0.5,1,1,1],[0,0.5,1,0,1,0.5,1,0.5,0.5],[1,0,0.5,0.5,1,0.5,0.5,0,1],[1,0,0.5,1,0,0.5,1,0.5,0],[1,1,1,0,0,0.5,0.5,0.5,0],[0.5,1,0,0.5,1,0.5,0,1,0.5],[1,0,0.5,1,0,0.5,1,0.5,0],[0.5,0,1,0,1,0.5,1,0.5,0.5],[1,1,1,0.5,0,0.5,0,0.5,0],[0,1,0.5,0.5,1,0.5,0,1,0.5],[1,0.5,0.5,0.5,1,0.5,0,0,1],[0,1,0,0.5,1,0.5,0.5,1,0.5],[1,0,0,0.5,1,0.5,0.5,0.5,1],[0,0.5,0.5,0,0,0.5,1,1,1],[1,0,0,0.5,1,0.5,0.5,0.5,1],[1,0.5,0,0.5,1,0.5,0.5,0,1],[1,1,1,0,0,0.5,0.5,0.5,0],[1,0,0.5,0.5,1,0.5,0,0.5,1],[1,0.5,0,1,0,0.5,1,0,0.5],[1,0.5,0,1,0,0.5,1,0.5,0],[0,1,0.5,0,1,0.5,0.5,1,0.5],[0.5,0.5,1,0.5,1,0.5,1,0,0],[0,0.5,1,0,1,0.5,1,0.5,0.5],[0,1,0.5,0,1,0.5,0.5,1,0.5],[1,0.5,0.5,0,1,0.5,0.5,0,1],[1,0.5,0,1,0,0.5,1,0.5,0],[0.5,1,0,0,1,0.5,0.5,1,0.5],[0.5,1,0.5,0.5,1,0.5,0,1,0],[0.5,0.5,1,0.5,1,0.5,1,0,0],[0.5,0,1,0,1,0.5,1,0.5,0.5],[1,1,1,0,0,0.5,0.5,0.5,0],[0.5,0,1,0.5,1,0.5,1,0,0.5],[0.5,0,1,0,1,0.5,1,0.5,0.5],[1,0,0,0.5,1,0.5,0.5,0.5,1],[1,0,0.5,0.5,1,0.5,0.5,0,1],[1,0.5,0,0.5,1,0.5,0.5,0,1],[1,0.5,0,1,0,0.5,1,0.5,0],[0,0.5,0.5,0,0,0.5,1,1,1],[1,1,1,0,0,0.5,0.5,0,0.5],[1,1,1,0,0,0.5,0,0.5,0.5],[0.5,0,0.5,0,0,0.5,1,1,1],[0,0.5,1,0.5,1,0.5,1,0.5,0],[0.5,1,0,0,1,0.5,0.5,1,0.5],[0.5,1,0,0,1,0.5,0.5,1,0.5],[0.5,0,1,0.5,1,0.5,1,0,0.5],[0.5,1,0,0.5,1,0.5,0,1,0.5],[1,0,0.5,0,1,0.5,0.5,0.5,1],[0.5,1,0.5,0,1,0.5,0.5,1,0],[0,0.5,1,0.5,1,0.5,1,0,0.5],[0,0.5,0.5,0,0,0.5,1,1,1],[1,1,1,0.5,0,0.5,0,0,0.5],[1,0,0.5,1,0,0.5,1,0.5,0],[0,1,0,0.5,1,0.5,0.5,1,0.5],[0.5,0,0,0.5,0,0.5,1,1,1],[0,0,1,0.5,1,0.5,1,0.5,0.5],[0.5,0,0,0.5,0,0.5,1,1,1],[1,1,1,0,0,0.5,0,0.5,0.5],[0.5,1,0.5,0.5,1,0.5,0,1,0],[1,0.5,0.5,0,1,0.5,0,0.5,1],[1,0.5,0.5,0,1,0.5,0.5,0,1],[0.5,0,1,0.5,1,0.5,1,0.5,0],[0,1,0,0.5,1,0.5,0.5,1,0.5],[1,1,1,0.5,0,0.5,0,0,0.5],[0,0,1,0.5,1,0.5,1,0.5,0.5],[0.5,1,0.5,0,1,0.5,0,1,0.5],[0,0.5,1,0.5,1,0.5,1,0.5,0],[0.5,0,0.5,0,0,0.5,1,1,1],[1,1,1,0.5,0,0.5,0.5,0,0],[0,0.5,1,0,1,0.5,1,0.5,0.5],[1,1,1,0.5,0,0.5,0,0.5,0]];

var winningMoves = [];

while(winningSet.length){
	
	winningMoves.push({
	input: winningSet.shift(),
	output: [1]
	
	});
	
}


/*
let normalSet = [];
let dummyInput = new Array(9).fill(Math.random);
for(var i = 0; i<500; i++){
	
for (i in dummyInput){
	if(dummyInput[i]>.7){
		dummyInput[i] = 1;
	}
	else if(dummyInput[i]<.3){
		dummyInput[i] = 0;
	}
	else dummyInput[i] = .5;
}
	
if(wins.win(dummyInput)){
	
	normalSet.push({
		
		input: dummyInput,
		output: 1
		});
}

else{
	normalSet.push({
		input: dummyInput,
		output: 0
	});
}
	dummyInput = dummyInput.fill(Math.random);
}
*/

//var nullSet = [];//random moves are considered poor

function makeNullSet() {
	
	let nullSet = [];
for(let i = 0; i<500;i++){

nullSet.push({ input: [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()],
	output: [0]
});	


}
return nullSet;
}


//moves contains the potentially evaluated move, .5 is the neutral state.

//var gridMap = [.5,.5,.5,.5,.5,.5,.5,.5,.5];

var game = function(moves, count, player, playerTwo){

//var moves = [.5,.5,.5,.5,.5,.5,.5,.5,.5];
let movesRated = [];
let plays = player;
if(count%2===0){
	
	plays = playerTwo;
	console.log("two plays");
}

for (var i = 0; i<9; i++) {
	
	let moveCache = moves.slice();
	
	if(moveCache[i]===.5){
	moveCache[i] = 1;
	
	let rating = plays.activate(moveCache);
	movesRated.push(rating[0]);
	
	//console.log(movesRated[i] + " " + i + 1);
	//console.log(ticTacPlayer.activate(moveCache));
	
}
else {
movesRated.push(0); 
//console.log("move " + i + " already taken");
}
	
	}
	
let move = movesRated.indexOf(Math.max.apply(Math,movesRated))+1;


	//moves = ACME.flip(moves);
	moves[move-1] = 1;

let logmoves = moves.slice();
if(count%2===0){
console.log("flipping board");
logmoves = ACME.flip(logmoves);
}
console.log(move);
console.log(logmoves.slice(0,3));
console.log(logmoves.slice(3,6));
console.log(logmoves.slice(6));

//console.log(moves);
//console.log(movesRated);

//console.log(ticTacPlayer.activate([.5,.5,.5,.5,1,.5,.5,.5,.5]));

//console.log("it's alive!");
if(wins.win(moves)){
	console.log("win");
	console.log(count);
	if(count<=6){
	return moves;

}
else return false;
}
else if(count>=moves.length){
	console.log("ran out of moves");
	return false;
	}
else if(moves.indexOf(.5)===-1){
	console.log("tie");
	//console.log(moves);	
	return false;
	
}

else {
count++;

moves = ACME.flip(moves);

return game(moves, count, player, playerTwo);
/*

if(count%2===0){
	
	let playerTwoMoves = moves.slice();
	
	playerTwoMoves = ACME.flip(playerTwoMoves);
	
	return game (playerTwoMoves,count);
}
else return game(moves, count);
*/
}

}

var results = {
	
	resultArray: []
	};
for(var i = 0; i<2; i++){
	let	ticTacPlayer = new Perceptron(9,27,1);
	ticTacTrainer= new Trainer(ticTacPlayer);
	ticTacTrainer.train(trainSet);
	ticTacTrainer.train(mustSet);
	ticTacTrainer.train(makeNullSet());
	
	let secondPlayer = new Perceptron(9,27,1);
	secondTrainer = new Trainer(secondPlayer);
	secondTrainer.train(trainSet);
	secondTrainer.train(mustSet);
	secondTrainer.train(makeNullSet());
	
//ticTacTrainer.train(winningMoves);
	//uncomment this to seed with your results
	
let gameresult = game([.5,.5,.5,.5,.5,.5,.5,.5,.5], 1, ticTacPlayer, secondPlayer);

if(gameresult!=false){
	
	results.resultArray.push(gameresult);
	
}
//ticTacPlayer = new Perceptron(9,27,1);
//ticTacTrainer.train(trainSet);
//ticTacTrainer.train(mustSet);
//ticTacTrainer.train(makeNullSet);

	
}
//make sure this file exists! 
results = JSON.stringify(results);
fs.appendFile('winset.json', results,err => {  
    if (err) throw err;
});


//This is single player tic tac toe
//theoretically the network should only take 3 moves to win by itself
//any more than that and it is not efficient. 
