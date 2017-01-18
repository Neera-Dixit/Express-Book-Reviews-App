var bookController=function(bookService,nav,dbUtil){

	var middleWare=function(req,res,next){
		if(!req.user){
			/*res.redirect('/');
			return;*/
		}
		next();
	};

	var getIndex=function(req,res){
		dbUtil.bookData.find({},function(err,data){
			if(!err && data){
				res.render('bookListView',{title:"Express App",nav:nav,books:data});
			}
			else{
				res.status(500).send("No Data Found!");
			}
		})
		
	};

	var getId=function(req,res){
		var id=req.params.id;
		
		dbUtil.bookData.findOne({bookId:id},function(err,book){
			if(!err && book){
				//var book=data[id];
				bookService.getBookById(id,function(err,bookDesc){
					book.book=bookDesc;
					res.render('bookView',{title:"Express App",nav:nav,book:book});
				});
				
			}
			else{
				res.status(500).send("No Data Found!");
			}
		})
	};

	return {
		getIndex:getIndex,
		getId:getId,
		middleWare:middleWare
	};
};

module.exports=bookController;