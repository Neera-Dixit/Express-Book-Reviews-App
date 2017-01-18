var mongoose=require('mongoose');
var Schema=mongoose.Schema;

mongoose.connect("mongodb://localhost:/mongodb-nodejs");

mongoose.connection.on('connected',function(err){
	console.log("Connected successfully to "+"mongodb://localhost:/mongodb-nodejs");
});

mongoose.connection.on('disconnected',function(err){
	console.log("Disconnected successfully to "+"mongodb://localhost:/mongodb-nodejs");
});

mongoose.connection.on('error',function(err){
	console.log("Connected unsuccessfull to "+"mongodb://localhost:/mongodb-nodejs");
});

var bookSchema=new Schema({
	title:String,
	genre:String,
	author:String,
	read:Boolean,
	bookId:Number
});

var userSchema=new Schema({
	name:String,
	password:String
});

var bookData=mongoose.model('books',bookSchema);
var userData=mongoose.model('users',userSchema);

exports.userData=userData;
exports.bookData=bookData;
exports.mongoose=mongoose;