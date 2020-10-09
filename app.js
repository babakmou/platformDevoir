var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose');
const enseignantRouter = require('./routes/enseignantRoutes');
const etudiantRouter = require('./routes/etudiantRoutes');
const qcmRouter = require('./routes/qcmRoutes');
const vraiFauxRouter = require('./routes/vraiFauxRoutes');
const aDevelopperRouter = require('./routes/aDevelopperRoutes');
const devoirRouter = require('./routes/devoirRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/enseignants', enseignantRouter);
app.use('/api/etudiants', etudiantRouter);
app.use('/api/qcms', qcmRouter);
app.use('/api/adeveloppers', aDevelopperRouter);
app.use('/api/vraifaux', vraiFauxRouter);
app.use('/api/devoirs', devoirRouter);

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
const database = config.get('db');
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology:true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log(`connected to ${ database }...`));

module.exports = app;
