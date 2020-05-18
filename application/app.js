var express         = require('express');
var path            = require('path');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var mysqlStore      = require('express-mysql-session')(session);
var app             = express();

// Routes
var indexRouter     = require('./routes/index');
var usersRouter     = require('./routes/users');
var postsRouter     = require('./routes/posts');
var commentsRouter  = require('./routes/comments');

// Express settings
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Sessions
var sessionStore = new mysqlStore({ /* Using default options */ }, require('./conf/database'));
var sessionOptions = {
    key: 'csid',
    secret: 'Dakjuyjyhtgfeavb34L$gdfWDQ<A:D"W<:L',
    store: sessionStore,
    cookie: { 
        secure: false, 
        httpOnly: false, 
        maxAge: 9000000, 
        sameSite: true 
    },
    resave: true,
    saveUninitialized: false,
};


app.use(session(sessionOptions));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// Displaying error page on backend malfunctions.
app.use((err, req, res, next) => {
    res.sendFile('error.html', { root: 'public/html' });
});

module.exports = app;
