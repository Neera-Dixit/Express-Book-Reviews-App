var express=require('express');
var bookRouter=express.Router();

var bookData=[{
	title:"War and Peace",
	genre:"Fiction",
	author:"anonymous",
	read:false,
	bookId:656
},{
	title:"A Midsummer Night's Dream",
	genre:"Fiction",
	author:"William Shakespeare,",
	read:true,
	bookId:1622
}];

var router=function(nav,dbUtil){

	var bookService=require('../services/goodReadsService')();
	var bookController=require('../controllers/bookController')(bookService,nav,dbUtil);

	bookRouter.use(bookController.middleWare);

	bookRouter.route("/")
	.all(function(req,res,next){
		console.log("Books Middleware entered");
		next();
	})
	.get(bookController.getIndex);

	bookRouter.route("/:id")
	.all(function(req,res,next){
		console.log("Book Middleware entered");
		next();
	})
	.get(bookController.getId);

	return bookRouter;
}

module.exports=router;