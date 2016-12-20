const http = require("http");
const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser')
const exphbs  = require('express-handlebars');
const server = http.createServer(app);


let counter = 1;
let alumnos = [];

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout:'default'}));
app.set('view engine', '.hbs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.use( (req,res,next) => {
	console.log("mws 1");
	req.counter = counter++;
	next();
});

app.get("/counter", (req,res) => res.end( ' ' + req.counter));

/*
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
*/
app.get("/" , (req,res) => {
	res.render("home", {alumnos:alumnos});
})


app.get("/add", (req,res) => res.render("form"));

app.post("/save" , (req,res) => {
	let alum = req.body;
	alum.fecha = new Date().toString();
	alumnos.push(alum);
	fs.writeFile( './security/registro.txt', JSON.stringify(alum) + '\n',{enconding:'utf8',flag: 'a+'} , (err) => {
		if (err) {
			console.log('error');
		}
	});
	//res.json(req.body);
	res.redirect('/');
});


server.listen(5000);