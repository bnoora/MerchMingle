require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require("express-rate-limit");
const http = require('http');

var apiRouter = require('./routes/inventory');

var app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Middleware
// set up rate limiter: maximum of 40 requests per minute
const limiter = RateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 40
});
app.use(limiter);

// Add helmet
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			"script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
		},
	})
);

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(mongoDB);
}

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Api routes
app.use('/api', apiRouter);

// Add compression middleware
app.use(compression());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/dist')));

// catch 404 and forward to error handler
app.use('/api/*', function(req, res, next) {
	next(createError(404));
});
  
// Serve react app
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
  
	// Send error response
	res.status(err.status || 500).json({ error: err.message });
  });


// Listen on port
server.listen(port, () => {
	console.log(`Listening on port ${port}`);
	console.log(path.join(__dirname, 'client/dist'));
});