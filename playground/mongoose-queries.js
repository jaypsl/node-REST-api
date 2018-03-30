const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/users');

var id = '5abdec558a7ecc078327d2c3';

User.findById(id).then((jp)=>{
if(!jp){
	return console.log('no user found');
}
console.log('users', jp)	
})
.catch((e)=>{console.log(e)});







// var id = '5abe8a7642b45e03d76ad71';

// if(!ObjectID.isValid(id)){
// 	console.log('id not valid');
// }
// // Todo.find({
// // 	_id: id
// // }).then((todos)=>{
// // 	console.log('todos', todos);
// // });

// // Todo.findOne({
// // 	_id: id
// // }).then((jsks)=> {
// // 	console.log('todo', jsks);
// // });

// Todo.findById(id).then((todo)=>{
// if(!todo){
// 	return console.log('id not found')
// }
// 	console.log('todo by id',todo);

// }).catch((e)=> console.log(e));