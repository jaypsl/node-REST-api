
const {ObjectID} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/users');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

 app.post('/todos', (req,res)=> {

 	var todo = new Todo({
	text: req.body.text
});

todo.save().then((doc)=>{
res.send(doc);
}, (e)=>{
	res.status(400).send(e);
});
//console.log(req.body);
 });



 //GET /todos
 app.get('/todos/:id', (req,res)=> {
 	var id = req.params.id;

 	if(!ObjectID.isValid(id)){
 		return res.status(404).send();
 	}

 	Todo.findById(id).then((todo)=>{
 		if(!todo){return res.status(404).send();}
 		res.send({todo});
 	}).catch((e)=> {
 		res.status(400).send();
 	});
 	
 	//res.send(req.params);
 	//valid id using isvalid
 	//404

 	//findById
 	//success
 	//if todo -send it back
 	//if no todo -send back 404 with empty body
 	//error
 	//400 - and send empty body back
 });

 //GET /todos/1234sggdhf
 app.get('/todos', (req,res)=>{
 	Todo.find().then((todos)=>{
 		res.send({todos});
 	}, (e)=>{
 		res.status(400).send(e);
 	})
 })

app.listen(port, ()=> {
	console.log(`started on port ${port}`);
})

module.exports = {app};

