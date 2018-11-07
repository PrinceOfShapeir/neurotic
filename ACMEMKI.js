


exports.sum = function (array){
	if(!Array.isArray(array)){
	
	return "Error not an array";
	}
	
	let s = 0;
	for(i in array){
		
		s += array[i];
	}
	return s;
}

// returns the inverse of any normalized array
exports.flip = function (array) {
	
	if(!Array.isArray(array)){
	
	return "Error not an array";
	}
	

		for(i in array){
		
			array[i] = Math.abs(array[i]-1);
		}
	
	return array;
	
}
