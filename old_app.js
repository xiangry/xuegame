var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var old_app = express();

// view engine setup
old_app.set('views', path.join(__dirname, 'views'));
old_app.set('view engine', 'pug');

old_app.use(logger('dev'));
old_app.use(express.json());
old_app.use(express.urlencoded({ extended: false }));
old_app.use(cookieParser());
old_app.use(express.static(path.join(__dirname, 'public')));

old_app.use('/', indexRouter);
old_app.use('/users', usersRouter);

// catch 404 and forward to error handler
old_app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
old_app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = old_app;
