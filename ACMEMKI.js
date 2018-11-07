module.exports = {
	sum,
	flip,
	validNumber

}


const sum = function (array){
	if(!Array.isArray(array)){
	
	return "Error not an array";
	}
	
	let s = 0;
	for(i in array){
		
		if(valnum(array[i]){

			s += array[i];
		}
	}
	return s;
}

// returns the inverse of any normalized array
const flip = function (array) {
	
	if(!Array.isArray(array)){
	
	return "Error not an array";
	}
	

	for(i in array){

		if(valnum(array[i])){

			array[i] = Math.abs(array[i]-1);

		}
	}
	
	return array;
	
}

//provides terse way of strictly validating numbers
const valnum = function (number) {

	return typeof(number)===Number;

}
