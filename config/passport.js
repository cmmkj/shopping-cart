var passport = require('passport');

var User = require("../models/user.js");
var localStategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});                           


passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local.signup',new localStategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true  //此处为true，下面函数的参数才能有req
    },function(req,email,password,done){
        req.checkBody('email','您输入的email无效').notEmpty().isEmail();
        req.checkBody('password',"您输入了无效密码").notEmpty().isLength({min:4});
        var errors = req.validationErrors();
        if(errors){
            var messages = [];
            errors.forEach(function(error){
                messages.push(error.msg);
            });
         return done(null,false,req.flash('error',messages));
        }
        User.findOne({'email':email},function(err,user){
            if(err){
                return done(err);
            }
            if(user){
                return done(null,false,{message:"此邮件已经被注册"});
            }
            var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            newUser.save(function(err,result){
                if(err){
                    return done(err);
                }
                return done(null,newUser);
            });
        });
}));



passport.use('local.login',new localStategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true  //此处为true，下面函数的参数才能有req
},function(req,email,password,done){
    req.checkBody('email','您输入的email无效').notEmpty();
        req.checkBody('password',"您输入了无效密码").notEmpty();
        var errors = req.validationErrors();
        if(errors){
            var messages = [];
            errors.forEach(function(error){
                messages.push(error.msg);
            });
         return done(null,false,req.flash('error',messages));
        }
         User.findOne({'email':email},function(err,user){
            if(err){
                return done(err);
            }
            if(!user){
                return done(null,false,{message:"用户名错误!"});
            }
            if(!user.validPassword(password)){
                return done(null,false,{message:"密码错误!"});
            }
            return done(null,user);
        });

}));















