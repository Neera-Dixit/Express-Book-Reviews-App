var express=require('express');
var authRouter=express.Router();
var passport=require('passport');

var router=function(nav,dbUtil){

	authRouter.route("/profile")
	.all(function(req,res,next){
		if(!req.user){
			//res.redirect("/")
			//return
		}
		next();
	})
	.get(function(req,res){
		res.json(req.user);
	});

	authRouter.route("/signUp")
	.all(function(req,res,next){
		console.log("Authors Middleware entered");
		next();
	})
	.post(function(req,res){
		console.log(req.body);
		var user=new dbUtil.userData({name:req.body.userName,password:req.body.password});
		user.save(function(err,data){
				req.login(req.body,function(){
				res.redirect('/auth/profile');
			});
		});
		
	});

	authRouter.route("/signIn")
	.all(function(req,res,next){
		console.log("author Middleware entered");
		next();
	})
	.post(passport.authenticate('local',{
		failureRedirect : '/'
	}),
	function(req,res){
		res.redirect('/auth/profile');
	}
	);

	return authRouter;
}

module.exports=router;