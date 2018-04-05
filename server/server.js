const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

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

 app.delete('/todos/:id', (req,res)=> {
//get the id
var id = req.params.id;

//validate the id
if(!ObjectID.isValid(id)){
	return res.status(404).send();
}

//remove todo by id
Todo.findByIdAndRemove(id).then((todo)=>{
if(!todo){
	return res.status(404).send();
}
res.send({todo});
}).catch((e)=>{
	res.status(400).send();
});
	//success
		//if no doc,send 404
		// if doc, send 200
	//error
		//400 with empty body
 });

 //lec84 to update use this, also need lodash module,pull off _.pick method takes array of property, if text is exist 
 app.patch('/todos/:id', (req,res)=>{
 	var id = req.params.id;
 	var body = _.pick(req.body, ['text','completed']);
 	if(!ObjectID.isValid(id)){
 		return res.status(404).send();
 	}
 	//check if the completed property is boolean and its on body
 	//getTime() returns js timestamp
 	if(_.isBoolean(body.completed) && body.completed){
 		body.completedAt = new Date().getTime()
 	}else{
 		body.completed = false;
 		body.completedAt = null;
 	}
 	//query to update the database with findoneandupdate
 Todo.findByIdAndUpdate(id,{$set:body}, {new:true}).then((todo)=>{
if(!todo){
	return res.status(404).send();
}
res.send({todo});
 }).catch((e)=>{
 	res.status(400).send();
 })



 });

app.listen(port, ()=> {
	console.log(`started on port ${port}`);
})

module.exports = {app};

