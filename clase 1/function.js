
// var => global variable
// let => let you change the value but not the type 
// const => cannot change the value

var f = function(n){ 
 var ar = []; 
 	for (i = 0 ; i < n; i++){ 
 		ar.push(function(){});
  	}
  	return ar;
};


const sum = e => e * 2;


var a =5;
function parent(){
	console.log(a);
	function child(){
		console.log(a);
	}
	child();
}
parent();



let array = [];
const arrow = n => {
	for ( let i = 0 ; i < n ; i++) {
	  	array.push(function(){});
	}
} 




function myClass(){
	console.log("constructor");
}


myClass.prototype.hi = function(){
	console.log("hola");
}

myClass.prototype.name ="pepe";

let obj = new myClass();
let obj2 = new myClass();
obj2.name;


myClass.prototype.bye = () => console.log("bye");

// COMO SABER DE QUE CLASE ES UNA INSTANCIA??.
/*
	respuesta
	obj.constructor.name;
*/



let frutas = ['Pera','Uva','Manzana','Banana','Pera'];
let map = {};

function contar(){
	for(i = 0 ; i < frutas.length; i ++){
		let fruta = frutas[i];
		if( map[fruta] !== undefined){
			map[fruta] = map[fruta] + 1;
		}else{
			map[fruta] = 1;
		}
	}
}