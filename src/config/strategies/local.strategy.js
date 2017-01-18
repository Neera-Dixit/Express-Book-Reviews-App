var passport=require('passport'),
	localStrategy=require('passport-local').Strategy;

module.exports=function(dbUtil){

	passport.use(new localStrategy({
		usernameField:'userName',
		passwordField:'password'
	},
	function(username,password,done){
		console.log(username+":"+password);
		var user={
			name:username,
			password:password
		};

		dbUtil.userData.findOne(user,function(err,user){
			//console.log(user[0].name);

			if(err){
				res.status(500).send("Some problem");
			}
			if(user){
				done(null,user);
			}
			else{
				done(null,false,{message: "invalid User"});
			}
		});
	}));
};