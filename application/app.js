var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var mysqlStore      = require('express-mysql-session')(session);
var app             = express();

// Routes
var indexRouter     = require('./routes/index');
var usersRouter     = require('./routes/users');
var testRouter      = require('./routes/dbtest');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuring sessions
var sessionStore = new mysqlStore({ /* Using default options */}, require('./conf/database'));
var sessionOptions = {
    key: 'sessionID',
    secret: 'Dakjuyjyhtgfeavb34L$gdfWDQ<A:D"W<:L',
    store: sessionStore,
    cookie: { secure: false, httpOnly: false, maxAge: 9000000 },
    resave: false,
    saveUnitialized: false
};

app.use(session(sessionOptions));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dbTest', testRouter);

app.use((err, req, res, next) => {
    res.status(500);
    res.json({
        status: 500,
        message: 'Something went wrong with the database..'
    });
});

module.exports = app;
