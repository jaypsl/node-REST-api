const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');
const {app} =require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
	_id: new ObjectID(),
	text: 'first test todo'
},{
	_id: new ObjectID(),
	text: 'second test todo',
	completed: true,
	completedAt: 333
}];

beforeEach((done)=>{
	Todo.remove({})
	.then(()=>{
		return Todo.insertMany(todos);})
	.then(()=> done());
});

describe('POST/todos', ()=> {
	it('should create a new todo', (done)=>{
		var text = 'test todo text';
		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res)=> {
			expect(res.body.text).toBe(text);
		})
		.end((err,res)=>{
			if(err){
				return done(err);
			}
			Todo.find({text}).then((todos)=>{
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();
			}).catch((e)=> done(e)); 
		});
	});


it('should not create todo with invalid data', (done)=>{
	request(app)
	.post('/todos')
	.send({})
	.expect(400)
	.end((err,res)=>{
		if(err){
			return done(err);
		}
		Todo.find().then((todos)=> {
			expect(todos.length).toBe(2);
			done();
		}).catch((e)=>done(e));
	});

});

});


describe('GET /todos', ()=> {
	it('should get all todos', (done)=>{
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res)=>{
			expect(res.body.todos.length).toBe(2);
		})
		.end(done);
	});
});
describe('GET /todos/:id', ()=>{
it('should return todo doc', (done)=>{
	request(app)
	.get(`/todos/${todos[0]._id.toHexString()}`)
	.expect(200)
	.expect((res)=>{
		expect(res.body.todo.text).toBe(todos[0].text);
	})
	.end(done);
});


it('should return 404 if todo not found', (done)=>{
//make sure u get 404 back
var HexId = new ObjectID().toHexString();
request(app)
.get(`/todos/${HexId}`)
.expect(404)
.end(done);
});


it('should return 404 for non-object ids', (done)=>{
//todos/123
request(app)
.get('/todos/123rgb')
.expect(404)
.end(done);
});


});

describe('DELETE /todos/:id',()=>{
	it('should remove a todo', (done)=>{
		var HexId = todos[1]._id.toHexString();

		request(app)
		.delete(`/todos/${HexId}`)
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo._id).toBe(HexId);
		})
		.end((err,res)=>{
			if(err){
				return done(err);
			}
			Todo.findById(HexId).then((todo)=>{
				expect(todo).toNotExist();
				done();
			}).catch((e) => done(e));
			//query database using findById toNotExist
		});
	});

	it('should return 404 if todo not found', (done)=>{
var HexId = new ObjectID().toHexString();
request(app)
.delete(`/todos/${HexId}`)
.expect(404)
.end(done);
	});

	it('should return 404 if object id is invalid', (done)=>{
request(app)
.delete('/todos/123rgb')
.expect(404)
.end(done);
	});
});

describe('PATCH /todos/:id', ()=>{
	it('should update the todo', (done)=>{
		var HexId = todos[0]._id.toHexString();
		var text = "this should be the new text";

		request(app)
		.patch(`/todos/${HexId}`)
		.send({
			completed:true,
			text
		})
		.expect(200)
		.expect((res)=> {
			expect(res.body.todo.text).toBe(text);
			expect(res.body.todo.completed).toBe(true);
			expect(res.body.todo.completedAt).toBeA('number');
		})
		.end(done);
		//grab id of first item
		// update text, set completed true
		//200
		//text is changed, completed is true, completedAt is a numner .toBeA
	});

	it('should clear ', (done)=>{
		var HexId = todos[1]._id.toHexString();
		var text = "this should be the new text ; ; '";

		request(app)
		.patch(`/todos/${HexId}`)
		.send({
			completed:false,
			text
		})
		.expect(200)
		.expect((res)=> {
			expect(res.body.todo.text).toBe(text);
			expect(res.body.todo.completed).toBe(false);
			expect(res.body.todo.completedAt).toNotExist();
		})
		.end(done);
//grab id of second todo item
//update text, set completed to false
//200
//text is changed, completed false, completedAt is null .toNotExist
	});
})


