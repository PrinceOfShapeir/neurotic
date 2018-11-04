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
}, 
//moves that aren't winning moves are considered bad ones
//depending on how the training algo works, it either evaluates this every pass, or evaluates once and trains the same hardcoded value
//obviously we prefer the former
{ input: [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()],
	output: [0]
}

]



ticTacTrainer.train(trainSet);
//moves contains the potentially evaluated move, .5 is the neutral state.
var moves = [.5,.5,.5,.5,.5,.5,.5,.5,.5];
var movesRated = [];

for (var i = 0; i<9; i++) {
	
	let moveCache = moves.slice();
	
	if(moveCache[i]===.5){
	moveCache[i] = 1;
	
	movesRated.push(ticTacPlayer.activate(moveCache));
	
	console.log(movesRated[i] + " " + i + 1);
	
}
else {
movesRated.push(0); 
console.log("move " + i + " already taken");
}
	
	}

console.log(Math.max.apply(Math,movesRated));

//console.log(ticTacPlayer.activate([.5,.5,.5,.5,1,.5,.5,.5,.5]));

console.log("it's alive!");
