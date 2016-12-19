const http = require("http");
const express = require("express");
const app = express();

const server = http.createServer(app);

let counter = 1;
app.use(express.static('./public'));
app.use( (req,res,next) => {
	console.log("mws 1");
	req.counter = counter++;
	next();
});

app.get("/counter", (req,res) => res.end( ' ' + req.counter));

server.listen(5000);