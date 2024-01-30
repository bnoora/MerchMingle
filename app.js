require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require("express-rate-limit");
const cors = require('cors');

var apiRouter = require('./routes/inventory');


var app = express();


// // set up rate limiter: maximum of 20 requests per minute
// const limiter = RateLimit({
// 	windowMs: 1 * 60 * 1000, // 1 minute
// 	max: 20
// });
// app.use(limiter);

// Add helmet middleware
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			"script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
		},
	})
);

const corsOptions = {
    origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

// Set up mongoose connection
mongoose.set("strictQuery", false);
const dev_db_url = "";
const mongoDB = process.env.MONGO_URI || dev_db_url;

main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(mongoDB);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/client/dist')));

// Add compression middleware
app.use(compression());

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Server react app
app.get('/', (req, res) => {
	res.sendFile(path.join('../client/dist/index.html'));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
  
	// Send error response
	res.status(err.status || 500).json({ error: err.message });
  });

module.exports = app;
