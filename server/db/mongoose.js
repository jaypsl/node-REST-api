var mongoose = require('mongoose');

//built in promise library
mongoose.promise = global.promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};