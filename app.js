var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongod = require('mongod');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var expressValidator = require('express-validator');

var index = require('./routes/index');
var users = require('./routes/users');

mongoose.connect('mongodb://localhost/simple-login');
var db = mongoose.connection;

var app = express();

// view engine setup- render react components on server by express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//start express session
app.use(session({
	secret: 'secret key',
	resave: true,
	saveUninitialized: true,
}));

//passport authentication
app.use(passport.initialize());
app.use(passport.session());//session auth

/*form field validation
Ref: https://github.com/VojtaStavik/GetBack2Work-Node/blob/master/node_modules/express-validator/README.md 
 errorformatter-function that formats the error objects before returning 
them to route handlers. */
app.use(expressValidator({
errorFormatter: function(param, msg, value) {

	var namespace = param.split('.'),
	root = namespace.shift(),
	formParam = root;
	while(namespace.length) {
		formParam += '[' + namespace.shift() + ']';
	}
	return {
		param: formParam,
		msg: msg,
		value: value
	};
      }
}));

//storing messages- global
//Flash helps in making messages(eg:err msgs) available to next page that is to be rendered
app.use(flash());
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
