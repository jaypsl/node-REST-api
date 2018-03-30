
var mongoose = require('mongoose');

//save new something
var Todo = mongoose.model('Todo',{
text: {
type: String,
required: true,
minlength: 1,
trim: true
},
completed: {
type: Boolean,
default: false
},
completedAt: {
type: Number,
default: null
}
});

// var newTodo = new Todo({
// text: 'cook lunch'
// });


// var jaytodo = new Todo({
// 	text: '   '
// });

// jaytodo.save().then((doc)=>{
// 	console.log('saved bro',doc);
// }, (err)=> {
// 	console.log('sorry for that', err);
// });

// newTodo.save().then((doc)=>{
// console.log('saved todo', doc);
// }, (e)=>{
// 	console.log('unable to save todo', e);
// });

module.exports = {Todo};