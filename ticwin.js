var ACME = require('./ACMEMKI.js'); //my handy js toolkit

exports.win = function (input){
	
	let side = Math.sqrt(input.length);
	let rows = [];
	let columns = [];
	let newColumns = []
	//let diags = [];
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
	
	if(ACME.sum(rows[i])===side){
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
	//console.log(ACME.sum(columns[i])===side);
	if(ACME.sum(newColumns[i])===side){
		console.log("column win");
		return true;
	}
	
}
	/*
	
	
	
	let inputString = input.slice().toString();
	let winTest = /(1,(0.5|0),(0.5|0),1,(0.5|0),(0.5|0),1)|/
	return /(1,){3}|1\d\d1\d\d1/.test(inputString);	
	
	*/
	let diag1 = 0;
	for(i = 0; i<input.length;){
		
	diag1 += input[i];
		
	i += side+1;
	}
	
	let diag2 = 0;
	
	for(let i = side -1; i<input.length-side+1;){
	//	console.log(i);
		
		diag2+= input[i];
		
		i += side - 1;
		
	}
	if(diag1===side||diag2===side){
		console.log("diagonal win");
		return true;
	}
	/*1
	for (i in diags){
	
	if(ACME.sum(diags[i])===side){
		console.log("diagonal win");
		return true;
	}
}	*/
	//console.log(ACME.sum(rows[0]));
	//console.log(ACME.sum(newColumns[0]));
	//console.log(diags);
	//console.log(ACME.sum(diags[0]));
	//console.log(ACME.sum(diags[0])===side);
	//return true;
	return false;
	
	
	//checks rows
}



