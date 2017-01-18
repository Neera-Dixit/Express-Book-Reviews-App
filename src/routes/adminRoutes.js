var express=require('express');
var adminRouter=express.Router();
//var dbUtil=require('../util/db_util');

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

	adminRouter.route("/addBooks")
	.get(function(req,res){
		//var book=new dbUtil.bookData(bookData);
		dbUtil.bookData.collection.insert(bookData,function(err,data){
			if(err){
				res.status(500).send("No Data Found");
			}
			else{
				res.status(200).send(data);
			}
		});

		//dbUtil.mongoose.connection.close();
	});

	return adminRouter;
};

module.exports=router;