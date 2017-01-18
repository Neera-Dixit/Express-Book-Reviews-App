var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var path=require('path');
var session=require('express-session');
var cookieParser=require('cookie-parser');

var dbUtil=require('./src/util/db_util');

var nav=[{link:"/books",text:"Books"},{link:"/authors",text:"Authors"}];

app.use(cookieParser());
app.use(session({secret:"dataEnc"}));

require('./src/config/passport')(app,dbUtil);

var bookRouter=require('./src/routes/bookRoutes')(nav,dbUtil);
var adminRouter=require('./src/routes/adminRoutes')(nav,dbUtil);
var authRouter=require('./src/routes/authRoutes')(nav,dbUtil);

var port = process.env.PORT || 3099;

app.set("views","./src/views");
app.set('view engine',"ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')));
app.use("/books",express.static(path.join(__dirname, 'public')));
//app.use(express.static('src/views'));



app.use("/books",bookRouter);
app.use("/admin",adminRouter);
app.use("/auth",authRouter);

app.get("/",function(req,res){
	res.render("index",{title:"Home Page",nav:nav});
})
app.listen(port,function(){
	console.log("Server listening at "+port);
});
