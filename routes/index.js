var move=require('../controllers/move'),
    users=require('../models/user'),
   
    mongoose=require('mongoose');

module.exports=function(app){

  app.use(function(req, res, next) {
    var _user = req.session.userid;
    app.locals.userid = _user;
    next();
    
  });

	app.get('/', function (req, res) {
      users.findAll(function(err,user){
          if(err){
              console.log(err);
              return;
          }
          res.render('userlist',{user:user});
      });

  	});
  	
  app.get('/admin',function(req,res){
      res.render('login',{message:''});
  });
  //add user;
  app.post('/admin',function(req,res){
    var username=req.body.username,
        password=req.body.password;
        users.findById(username,function(err,user){
            if(err){
              console.log(err);
              return;
            }
            if(user && user.comparePassword(password)){
              req.session.userid = user;
              res.redirect('/userlist');
            }else{
              res.render('login',{message:'用户名或密码错误'});
            }

        });

  });

	//用户列表；
  app.get('/userlist',function(req,res){
      users.findAll(function(err,user){
          if(err){
              console.log(err);
              return;
          }
          res.render('userlist',{user:user})
      });      
  });
  //删除用户；
  app.delete('/userlist',function(req,res){
      var userid=req.query.userid;
      if(userid){
          users.remove({_id:userid},function(err,user){
              if(err){
                console.log(err);
                return;
              }              
              res.json({msg:'OK'});
          });
      }
  });
  //注销
  app.get('/logout',function(req,res){
      delete req.session.userid;
      delete app.locals.userid;
      res.redirect("/admin");
  });
  //注册；
  app.get('/register',function(req,res){
      res.render('register',{message:""});
  });

  app.post('/register',function(req,res){
    var name=req.body.username,
        usemail=req.body.usemail,
        password=req.body.password,
        repeatpassword=req.body.repeatpassword;
      if(password!=repeatpassword){
        res.render('register',{message:"两次输入的密码不一样！"});
        return;
      }

    var user=new users({
        name:name,
        password:password,
        email:usemail
      });
      user.save(function(err,user){
        if (err) {
          if(err.code=='11000'){
            res.render('login',{message:'用户名已存在！'})   
          }
          return;
        };
        res.redirect('/admin');
      });
  });

  	
 }