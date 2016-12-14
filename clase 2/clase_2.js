const muy = n => Array.from(Array(100).keys()).map( (v,i) => n * i) ;


// map takes a function (current_value, actual_index (optinal),current_array (optional))

//filter takes a function (current_value, actual_index (optinal),current_array (optional))

let params = [];
let names = ['pepas','pepito','merengada','oreo','linconl','express','don satur grasa'];

function random (n){

	for(i = 0; i < n ; i++){
		params.push( {name: names[Math.floor(Math.random() * 7)],price: Math.floor(Math.random() * n), quantity:  Math.floor(Math.random()*n)} );
	}
}


const myFilter =  pr => params.filter ( (v) => v.price >= pr );