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

//yes the training area contains global variables, but those will be dealt with once the training
//section is moved to another module

const trainSet = [

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

];

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
//consider the input as a probability density function, that's why we don't need to collapse
//decimals into ones and zeros and it allows the compression of entire game sequence into a 
//single pdf interpretable via gradient descent
function makeNullSet() {
	
	let nullSet = [];
for(let i = 0; i<1000;i++){

nullSet.push({ input: [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()],
	output: [0]
});	


}
return nullSet;
}


//moves contains the potentially evaluated move, .5 is the neutral state.

//var gridMap = [.5,.5,.5,.5,.5,.5,.5,.5,.5];


function GameObject (player, playerTwo){
	
	this.player = player;
	this.playerTwo =  playerTwo;
	this.moves = new Array(9);
	this.moves = this.moves.fill(.5);
	this.count = 1;
	
	
	
}



function game(args){

//var moves = [.5,.5,.5,.5,.5,.5,.5,.5,.5];
let movesOld = args.moves.slice();
let movesRated = [];
let count = args.count + 0;
let playerOne = args.player;
let playerTwo = args.playerTwo;
let plays = playerOne;
if(count%2===0){
	
	plays = playerTwo;
	console.log("two plays");
}

for (var i = 0; i<9; i++) {
	
	let moveCache = movesOld.slice();
	
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
let movesNew =	movesOld;
movesNew[move-1] = 1;

let logmoves = movesNew.slice();
if(count%2===0){
//console.log("flipping board");
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
if(wins.win(movesNew)){
	console.log("win");
	console.log(count);
	
	/*this part to control quality flow
	let countgrade = true;
	if(count<6){
		countgrade = true;
	}*/	
	return {moves:movesNew,plays:plays, count:count%2, movesOld:movesOld};


//else return false;
}
else if(count>=movesNew.length){
	console.log("ran out of moves");
	return {moves:movesNew, plays:plays,count:count%2, tie:true, movesOld:movesOld};
	}
else if(movesNew.indexOf(.5)===-1){
	console.log("tie");
	//console.log(moves);	
	return false;
	
}

else {
count++;

movesNew = ACME.flip(movesNew);

return game({moves:movesNew, count:count, player:playerOne, playerTwo:playerTwo});
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


function gameon(){

let results = {
	
	resultArray: [],
	ultimateWinner: {},
	hyperbolicSet: []
	};
	
	let ultimateWin = {};
const gameGen = function(livesInput, winner, iterationsInput) {
	let lives = livesInput + 0;
	let iterations = iterationsInput + 0;
	let ticTacPlayer;
	let ticTacTrainer;
	
	if(!winner){
		ticTacPlayer = new Perceptron(9,18,1);
		ticTacTrainer= new Trainer(ticTacPlayer);
	//	ticTacTrainer.train(trainSet);
		ticTacTrainer.train(mustSet);
		ticTacTrainer.train(makeNullSet());
		console.log("Creating");
	}
	else {
		ticTacPlayer = winner;
	}
	
	let secondPlayer = new Perceptron(9,36,1);
	secondTrainer = new Trainer(secondPlayer);
	//secondTrainer.train(trainSet);
	secondTrainer.train(mustSet);
	secondTrainer.train(makeNullSet());
	if(results.hyperbolicSet.length&&Array.isArray(results.hyperbolicSet)){
		console.log(results.hyperbolicSet);
		secondTrainer.train(results.hyperbolicSet,{
			iterations: 300,
			cost: Trainer.cost.MSE
			});
		}
	
//ticTacTrainer.train(winningMoves);
	//uncomment this to seed with your results
	
	console.log("Starting");
	
let gameresult = game(new GameObject(ticTacPlayer, secondPlayer));

if(!gameresult.tie){
		let a = [{
			input: gameresult.moves,
			output: [1]
		},
		{
			input: ACME.flip(gameresult.moves),
			output: [0]
		},
		
			//back propagates a turn
		{
			input: gameresult.movesOld,
			output: [1]
		},
		{
			input: ACME.flip(gameresult.movesOld),
			output: [0]
		}
			
				
		
		
		];
		
		ticTacTrainer= new Trainer(gameresult.plays);
		ticTacTrainer.train(a,{
			iterations: 200,
			cost: Trainer.cost.MSE
			});
		console.log(a);
		results.hyperbolicSet = results.hyperbolicSet.concat(a);
	

		
		
		console.log("Training in the Hyperbolic Time Chamber");
		
}


	//playerone wins, adds to killcount, one step further to winning game entirely
if(lives<2&&!gameresult.tie&&gameresult.count!=0){
	lives++;
	results.resultArray.push(gameresult.moves);

		
		
	//trains on result

	return gameGen(lives,gameresult.plays, iterations);
}
	else if(lives>=2&&!gameresult.tie&&gameresult.count!=0){
		console.log(lives + 1 + " opponents have been vanquished.");
		console.log(iterations + 1 + " eons have passed before this result was achieved.");
		let finisher = gameresult.plays.clone();
		//finisher = finisher.toJSON();
		results.ultimateWinner = finisher;
		ultimateWin = finisher;
		return;
}

	//a new champion arises
else if(!gameresult.tie){
	iterations++;
	
	
	
	return gameGen(0, gameresult.plays, iterations);
}


	//tie scenario, but tie is assumed to be bad for playerOne (for now) returns secondPlayer
	//if tie is not bad, ticTacPlayer returned
else if(gameresult.tie){
	iterations++;
	let a = [{
			input: gameresult.moves,
			output: [0]
		},
		{
			input: ACME.flip(gameresult.moves),
			output: [1]
		},
		
			//back propagates a turn
		{
			input: gameresult.movesOld,
			output: [0]
		},
		{
			input: ACME.flip(gameresult.movesOld),
			output: [1]
		}
			
				
		
		
		];
		

			ticTacTrainer = new Trainer(ticTacPlayer);
			
		ticTacTrainer.train(a,{
			iterations: 200,
			cost: Trainer.cost.MSE
			});
		console.log(a);
	return gameGen(lives, ticTacPlayer, iterations);
}
else {
	
	console.log(gameresult);
	console.log("error game stopped");
	return;
}
	
}
//initialize with 0, false, 0
//If you have a saved character, insert them instead of false

let savedCharacter = false;

if (fs.existsSync('LastWinner.txt')){
	
	console.log("Saved Character Detected. Loading...");

	savedCharacter = fs.readFileSync('LastWinner.txt');
	
	savedCharacter = Network.fromJSON(JSON.parse(savedCharacter));
}

gameGen(0, savedCharacter, 0);

fs.writeFile('LastWinner.txt', JSON.stringify(ultimateWin), err=> {
	
	if(err) throw err;
});


const trainNewData = JSON.stringify(results.hyperbolicSet);

if(fs.existsSync('winset.json')){

fs.appendFile('winset.json', trainNewData,err => {  
    if (err) throw err;
	});

}
else {
	fs.writeFile('winset.json', trainNewData, err => {
		if(err) throw err;
	});
}

}
gameon();

