
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=> {
if(err){
	return console.log('unable to connect to mongodb server');
}
console.log('connected to mongodb server');

const db = client.db('TodoApp')

// db.collection('Todos').findOneAndUpdate({
// _id: new ObjectID('5abd99e618b67002aa7624c3')
// }, {
// 	$set: {
// 		text: "what to do tell me i love u"
// 	}
// }, {
// 	returnOriginal: "something to do"
// }).then((result)=> {
// 	console.log(result);
// });

db.collection('Users').findOneAndUpdate({
	_id: new ObjectID('5abda35ceb52bb02f698ea6d')
},{
	$set: {name: 'sonia'},
	$inc: {age: 1}
	
},{returnOriginal: false}).then((result)=>{
console.log(result);
});






//client.close();



});