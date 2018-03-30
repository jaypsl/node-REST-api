
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err){
		return console.log('unable to connect to mongoDB server');
	}
	console.log('connected to mongoDB server');

	const db = client.db('TodoApp')

	//deleteMany
	// db.collection('Todos').deleteMany({text: 'eat dinner'}).then((result)=>{
	// 	console.log(result);
	// });
	//deleteOne
	// db.collection('Todos').deleteOne({text: "fuck off"}).then((result)=>{
	// 	console.log(result);
	// });


	// //findOneand delete
	// db.collection('Todos').findOneAndDelete({complete: true}).then((result)=>{
	// 	console.log(result);
	// });

db.collection('Users').deleteMany({name:'jay'}).then((result)=>{
	console.log(result);
});

db.collection('Todos').findOneAndDelete({
	_id: new ObjectID('5abda7693760e88a8c0742e0')
}).then((result)=>{
	console.log(result);
});



	client.close();
})