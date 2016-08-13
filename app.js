var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session')
var exphbs = require('express-handlebars');

var passport = require('passport');
var flash = require('connect-flash');

var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);


var mongoose = require('mongoose');
mongoose.connect("localhost:27017/shopping");

require('./config/passport.js');

var routes = require('./routes/index');
var userroutes = require('./routes/user');
//var users = require('./routes/users');

var app = express();

app.engine('hbs',exphbs({
    defaultLayout:'main',
    extname:'.hbs'
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(validator());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store:new MongoStore({
        mongooseConnection:mongoose.connection
    }),
    cookie:{maxAge:180*60*1000} //store保存时间
}));

//对session操作的模块，应在session实例下面
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    res.locals.login = req.isAuthenticated();
    next();
});

app.use('/', routes);
app.use('/user', userroutes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
