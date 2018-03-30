//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=> {
if(err){
	return console.log('unable to connect to mongodb server');
}
console.log('connected to mongodb server');

const db = client.db('TodoApp')

// db.collection('Todos').find({
// 	_id: new ObjectID('5abda7693760e88a8c0742e0')
// }).toArray().then((docs)=>{
// console.log('Todos');
// console.log(JSON.stringify(docs, undefined,2));
// }, (err)=> {
// 	console.log('unable to fetch todos', err);
// });

// db.collection('Todos').find().count().then((count)=>{
// console.log(`Todos count:${count}`);
// //console.log(JSON.stringify(docs, undefined,2));
// }, (err)=> {
// 	console.log('unable to fetch todos', err);
// });


db.collection('Users').find({name: 'jay'}).toArray().then((docs)=>{
console.log(docs);
}, (err)=>{
	console.log('unable to get u the list', err);
});






 //client.close();
});