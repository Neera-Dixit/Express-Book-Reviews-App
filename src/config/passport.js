var passport=require('passport');

module.exports=function(app,dbUtil){

	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function(user,done){
		//console.log("user 1"+user);
		done(null,user);
	});

	passport.deserializeUser(function(user,done){
		//console.log("user 2"+user);
		done(null,user);
	});

	require('./strategies/local.strategy')(dbUtil);
}

