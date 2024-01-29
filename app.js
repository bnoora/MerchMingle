require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require("express-rate-limit");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();


// set up rate limiter: maximum of 20 requests per minute
const limiter = RateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 20
});
app.use(limiter);

// Add helmet middleware
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			"script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
		},
	})
);

// Set up mongoose connection
mongoose.set("strictQuery", false);
const dev_db_url = "";
const mongoDB = process.env.MONGO_URI || dev_db_url;

main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(mongoDB);
}



// view engine setup PUG
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Add compression middleware
app.use(compression());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/inventory', require('./routes/inventory'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
