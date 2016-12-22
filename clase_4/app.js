const http = require("http");
const express = require("express");
const fs = require("fs");
const app = express();
const mongo = require('mongojs');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const server = http.createServer(app);
const ObjectId = require("mongojs").ObjectId;
const db = mongo('mongodb://127.0.0.1/cursodb',['alumnos','logs']);



app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout:'default'}));
app.set('view engine', '.hbs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());





app.get("/" , (req,res) => {
	db.alumnos.find({}).limit(10).toArray( (err,data) => { 
		res.render ("home", {alumns:data});
	})
});


app.get("/add", (req,res) => res.render("form"));

//{"_id": ObjectId("51d151c6b918a71d170000c7")}
app.get("/info/:id", function(req,res){
	db.alumnos.find({_id:ObjectId(req.params.id)}, (err,data) => {
			res.render('info',{alum:data[0]});
	})
});

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