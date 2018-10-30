var synaptic = require('synaptic');
var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;


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
const sayings = ["Rock",
"Paper",
"Scissors",
"Shoot!"
]

function say(){

for(var i = 0; i<sayings.length;i++){

	console.log(sayings[i]);

}


}

function play(networkChoice,humanChoice){

say();

console.log("I have chosen " + networkChoice + ".");
console.log("You have chosen " + humanChoice + ".");
console.log("Oh well, better luck next time.");




}



Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

var newPercept = new Perceptron(1,4,1);
newTrainer= new Trainer(newPercept);

// x,x,x => rock, paper, scissors
var trainSet = [

{//rock
input: [1,0,0],
output: [1/3]
},
{//paper
input: [0,1,0],
output: [1/3]
},//scissors
{input: [0,0,1],
output: [1/3]
}

]


newTrainer.train(trainSet);




var rpc = {
 rock : newPercept.activate([1,0,0]),
 paper : newPercept.activate([0,1,0]),
 scissors : newPercept.activate([0,0,1]),
 greatest: "Rock"
};

if(rpc.paper>rpc.rock){
	rpc.greatest = "Paper";
	}
if(rpc.scissors>rpc.paper){
	rpc.greatest = "Scissors";
}

console.log("Welcome to Rock Paper Scissors");
let playerMove; //just random for now, you can technically 'play' the machine by modifying the value directly, at least until user input is implemented. 
let seed = Math.random();

	 
	 if(seed > 2/3){playerMove = "Scissors";}
	 else if(seed > 1/3){playerMove = "Paper";}
	 else playerMove = "Rock";
	 
	 
 


play(rpc.greatest,playerMove);





