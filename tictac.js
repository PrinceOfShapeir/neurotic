var synaptic = require('synaptic');
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

function sum (array){
	let s = 0;
	for(i in array){
		
		s += array[i];
	}
	return s;
}

function win(input){
	
	let side = Math.sqrt(input.length);
	let rows = [];
	let columns = [];
	let newColumns = []
	let diags = new Array(2);
	diags = diags.fill([]);
	/*
	let columns = new Array(side);
	columns = columns.fill([]);*/

for(let i = 0; i<input.length;){
rows.push(input.slice(i,side+i));
i += side;
}

//console.log(rows);
//return true;
for(i in rows){
	
	if(sum(rows[i])===side){
		console.log("row win");
		return true;
	}
	
	
}



for(i in rows){
	
	
	for(let z = 0; z<side;z++){
	
		
		columns.push(rows[z][i]);
		
	}
	
}
	
	//console.log(columns); return true;
	for(let i = 0; i<columns.length;){
newColumns.push(columns.slice(i,side+i));
i += side;
}

//console.log(newColumns);
//}


//console.log(rows);
//console.log(columns);
//return true;
for (i in newColumns){
	//console.log(sum(columns[i])===side);
	if(sum(newColumns[i])===side){
		console.log("column win");
		return true;
	}
	
}
	/*
	
	
	
	let inputString = input.slice().toString();
	let winTest = /(1,(0.5|0),(0.5|0),1,(0.5|0),(0.5|0),1)|/
	return /(1,){3}|1\d\d1\d\d1/.test(inputString);	
	
	*/
	
	for(i in input){
		
	diags[0].push(input[i]);
		
	i+=side+1;
	}
	
	for(let i = side -1; i<input.length;){
		
		diags[1].push(input[i]);
		
		i += side - 1;
		
	}
	
	for (i in diags){
	
	if(sum(diags[i])===side){
		console.log("diagonal win");
		return true;
	}
}
	//console.log(diags);
	//return true;
	return false;
	
	
	//checks rows
}



Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

var ticTacPlayer = new Perceptron(9,18,1);
ticTacTrainer= new Trainer(ticTacPlayer);

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

var nullSet = [];//random moves are considered poor
for(let i = 0; i<500;i++){

nullSet.push({ input: [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()],
	output: [0]
});	
	
}

ticTacTrainer.train(trainSet);
ticTacTrainer.train(mustSet);
ticTacTrainer.train(nullSet);
//moves contains the potentially evaluated move, .5 is the neutral state.

//var gridMap = [.5,.5,.5,.5,.5,.5,.5,.5,.5];

var game = function(moves, count){

//var moves = [.5,.5,.5,.5,.5,.5,.5,.5,.5];
var movesRated = [];

for (var i = 0; i<9; i++) {
	
	let moveCache = moves.slice();
	
	if(moveCache[i]===.5){
	moveCache[i] = 1;
	
	let rating = ticTacPlayer.activate(moveCache);
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

moves[move-1] = 1;

console.log(move);
console.log(moves.slice(0,3));
console.log(moves.slice(3,6));
console.log(moves.slice(6));
//console.log(moves);
//console.log(movesRated);

//console.log(ticTacPlayer.activate([.5,.5,.5,.5,1,.5,.5,.5,.5]));

//console.log("it's alive!");
if(win(moves)){
	console.log("win");
	console.log(count);
	return moves;
}
else if(count>=9){
	console.log("ran out of moves");
	return moves;
	}
else if(moves.indexOf(.5)===-1){
	console.log("tie");
	//console.log(moves);	
	return moves;
	
}

else {
count++;
return game(moves, count);

}

}

game(.5,.5,.5,.5,.5,.5,.5,.5,.5,], 1);

//This is single player tic tac toe
//theoretically the network should only take 3 moves to win by itself
//any more than that and it is not efficient. 
