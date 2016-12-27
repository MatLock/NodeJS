const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const mongojs = require('mongojs');
const app = express();
const server = http.createServer(app);
const fs = require('fs');
const db = mongojs('mongodb://localhost/mexico', ['alumnos']);
const io = require('socket.io')(server);

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'default'}) );
app.set('view engine', '.hbs');

app.use( express.static('./public') );
app.use(bodyParser.urlencoded({ extended: false }));



io.on('connection', (socket) => {
  socket.on('deleteAlumno', (_id) => {
      db.alumnos.remove({_id: db.ObjectId(_id)}, (err,data) => {
          socket.emit('notification','alumno Eliminado');
          socket.emit('reload',null);
      });
  });


  socket.on('onVerAlumno' , (dni) => {
     db.alumnos.findOne( {curp: dni}, {}, (err, doc)=>{
        socket.emit('profile', {alumno:  doc});
    });
  })


  socket.on('update', (obj) => {
     db.alumnos.update({_id: db.ObjectId(obj._id)}, {$set:obj.alumn}, (err, doc) => {})
  });

  socket.on('getAlumnos' (id) => {
    let query = {};
    if(id){
      query._id = db.ObjectId(id);
    }
    db.alumnos.find(query,{});
  });
});


app.get('/', (req, res)=> {
  db.alumnos.find({}, {}, (err, docs)=>{
    res.render('home', {});

});

app.get('/alumno/:curp', (req, res)=>{
  db.alumnos.findOne( {curp: req.params.curp}, {}, (err, doc)=>{
    res.render('profile', {alumno:  doc});
  });
});

app.get('/add', (req, res)=>{
  res.render('add', {action:'save',
  btnlabel: 'Add+'});
});

app.post('/save', (req, res)=>{
  req.query.added = new Date();
  db.alumnos.insert(req.body, (err, doc)=>{
    res.redirect('/');
  });
});

app.get('/filter', (req, res)=>{
  db.alumnos.find({prom: req.query.prom}, {}, (err, docs)=>{
    res.render('home', {alumnos: docs});
  });
});

app.get('/delete', (req, res)=>{
  db.alumnos.remove({_id: db.ObjectId(req.query._id)}, (err, doc)=>{
    res.redirect('/');
  });
});

app.get('/edit/:_id', (req, res)=>{
  db.alumnos.findOne({_id: db.ObjectId(req.params._id)}, (err, doc)=>{
    console.log('alumno: ', doc)
    res.render('add', {alumno: doc,
      action:'update',
      btnlabel: 'Update'
    });
  })
});

app.post('/update/:_id', (req, res)=>{
  db.alumnos.update({_id: db.ObjectId(req.params._id)}, {$set:req.body}, (err, doc)=>{
    res.redirect('/');
  });
});

console.log('listen');
server.listen(5000);
