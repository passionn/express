var express=require('express'),
	mongoose=require('mongoose'),
  bodyParser = require('body-parser'),
  session=require('express-session'),
  mongoStore=require('connect-mongo')(session),
  cookieParser = require('cookie-parser'),
  logger=require('morgan'),
	app = express();


app.set('view engine','ejs');
app.set('views',__dirname+"/views");

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(session({
    secret: "zhangpan",
    resave: false,
    saveUninitialized: false,
    cookie:{
      
    },
    store: new mongoStore({
      url: "mongodb://localhost/test",
      auto_reconnect: true,//issue 推荐解决方法
      collection: "sessions"
    })
}));
//设置 开发环境的请求信息；
if("development" === app.get("env")){
  app.set("showStackError",true);
  app.use(logger("dev"));
  app.locals.pretty = true;
  //mongoose.set("debug",true);
}

require('./routes')(app);
  

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
  console.log("open the mongodb");
});



app.listen(3000,function(){
	console.log('server start on port 3000');
});
