var mongoose = require('mongoose');

//built in promise library
mongoose.promise = global.promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};