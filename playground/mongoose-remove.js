const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/users');


//remove everything
//Todo.remove({}).then((result)=>{console.log(result);})

//Todo.findOneAndRemove


//Todo.findByIdAndRemove
Todo.findByIdAndRemove('5abebef833c9fa067565ef64')
.then((todo)=>{
	console.log(result);
});
