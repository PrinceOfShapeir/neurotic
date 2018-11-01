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
const sayings = ["Meenie" ,
"Meine" ,
"Moe",
"Catch a tiger",
"By the toe",
"If he hollers",
"Let him go",
"Eenie",
"Meenie",
"Meine",
"Moe",
]

function say(x){

console.log(sayings[x]);

}

function eenie(FirstOrSecond){

let win;
if(FirstOrSecond){

console.log("I'll start: Eenie");
win = "I win!";

}
else {
console.log("You start: Eenie");
win = "You win!";

}


for(var i = 0; i<sayings.length;i++){
	

	say(i);	
	

}

console.log(win);

}



Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

var newPercept = new Perceptron(1,4,1);
newTrainer= new Trainer(newPercept);

// 0 0 => 0 :chooses to go second
var trainSet = [

{
input: [0],
output: [0]
},
{
input: [1],
output: [1]
}

]


newTrainer.train(trainSet);





let eener = newPercept.activate([1]);
let neener = newPercept.activate([0]);

console.log("Welcome to Eeenie Meenie Meine Moe");

console.log("I am " + eener*100 + "% sure about this.");


let mse = Math.pow(1-eener,2)+Math.pow(neener, 2)/2;
let rmse = Math.sqrt(mse);
console.log("There is a " + rmse*100 +"% chance I have got this wrong.");

eenie((eener>Math.random()));//random alpha, set alpha lower to smooth out type 2 errors where mixed strategies are innappropriate

//console.log(newPercept.activate([0]));
//console.log(newPercept.activate([1]));
//console.log("please exit");






