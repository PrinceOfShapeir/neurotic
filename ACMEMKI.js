
const sum = function (array){
	if(!Array.isArray(array)){
	
	return "Error not an array";
	}
	
	let s = 0;
	for(i in array){
		
		if(valnum(array[i])){

			s += array[i];
		}
	}
	return s;
}

// returns the inverse of any normalized array
// lower bounds must be zero, but upper may be modified
const flip = function (array, upperBound = 1) {
	
	if(!Array.isArray(array)){
	
	return "Error not an array";
	}


	let ray = array.slice();
	

	for(i in ray){

		if(valnum(ray[i])){

			ray[i] = Math.abs(ray[i]-upperBound);

		}
	}
	
	return ray;
	
}

//provides terse way of strictly validating numbers
const valnum = function (number) {

	return typeof(number)==='number';

}


module.exports = {
	sum,
	flip,
	valnum
}
