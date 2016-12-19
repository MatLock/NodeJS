const http = require("http");
const express = require("express");
const fs = require("fs");
const app = express();

const server = http.createServer(app);

let counter = 1;
let personas = [];

app.use(express.static('./public'));




app.use( (req,res,next) => {
	console.log("mws 1");
	req.counter = counter++;
	next();
});

app.get("/counter", (req,res) => res.end( ' ' + req.counter));


app.get("/" , (req,res) => {
	let content = fs.readFileSync("./public/content.html").toString();
	let append = '';
	personas.forEach ( alu => {
		append += '<tr>'+
						'<td>'+ alu.dni + '</td>' +
						'<td>'+ alu.nombre + '</td>' +
						'<td>'+ alu.edad + '</td>'+
				 '</tr>';
	});
	res.end(content.replace('{{data}}',append));
})


app.get("/add", (req,res) => {
	res.end(fs.readFileSync("./public/add.html"));
});

app.get("/save" , (req,res) => {
	personas.push(req.query);
	console.log(personas);
	res.redirect('/');
});


server.listen(5000);