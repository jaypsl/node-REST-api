
var mongoose = require('mongoose');

var User = mongoose.model('user', {
email: {
type: String,
required: true,
minlength: 1,
trim: true
}
});


// var xyz = new User({
// 	email: 'solankijp94@gmail.com'
// });

// var jks = new User({
// 	email: ' '
// });

// xyz.save().then((doc)=>{console.log('save it successfully',doc)},(err)=>{console.log('unable to save it', err)});

// jks.save().then((doc)=>{console.log('save it successfully',doc)},(err)=>{console.log('unable to save it', err)});

module.exports = {User};