//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);
// var user = {name: 'jay', age:24};
// var {name} =  user;
// console.log(name);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=> {
if(err){
	return console.log('unable to connect to mongodb server');
}
console.log('connected to mongodb server');

const db = client.db('TodoApp')

// db.collection('Todos').insertOne({
// 	text: 'something to do',
// 	compeleted: false
// }, (err, result)=> {
// 	if(err){
// 		return console.log('unable to insert to do', err);
// 	}

// 	console.log(JSON.stringify(result.ops, undefined, 2));
// });

// insert new doc into users (name, age, location)


// db.collection('Users').insertOne({
// 	name: 'jay',
// 	age: 24,
// 	location: 'Hackensack'
// },(err,result)=>{
// 	if(err){
// 		return console.log('unable to insert user', err);
// 	}
// 	console.log(result.ops[0]._id.getTimestamp());
// });
// client.close();
});