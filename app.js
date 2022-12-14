var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const http = require('http')
require('dotenv').config()



const Port = process.env.PORT_NUMBER || 3000;

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

console.log(process.env.MONGO_URI)

var options = {
    mongoUrl: process.env.MONGO_URI,
    clear_interval: 3600
}


app.use(express.json());
app.use(bodyParser.json());
const server = http.createServer(app);
server.listen(Port, '0.0.0.0', console.log(Date.now))

mongoose.connect(process.env.MONGO_URI).catch(err => console.log(err));

mongoose.connection.once('open', () => {
    console.log('MongoDB connected')
})


module.exports = app;
