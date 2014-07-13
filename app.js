// Jeremy Bohrer - July 13 2014
// Single page login system with backbone.js and node.js
// Requirements server: express, mongoose, passport, passport-remember-me.
// Requirements client: backbone, jquery, underscore, boostrap, backbone.routefilter, jqueryvalidation.

// Features:
// Authentication in single page - http://www.frederiknakstad.com/2013/01/21/authentication-in-single-page-applications-with-angular-js/
// login user authentication - http://passportjs.org/
// persistent login - https://github.com/jaredhanson/passport-remember-me 
// sighnup
// logout
// user roles - public, user, admin
// determinig which routes are viewable based on the user's role.


var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo')(express);
var passport = require('passport');
var flash    = require('connect-flash');

var config = require('./config/config').config;

// db
var mongoose = require('mongoose');
// add the db to mongodb area. Not actually to localhost...
mongoose.connect(config.db.url);
var db = mongoose.connection;
// can't connect to the mognodb.
db.on('error', console.error.bind(console, 'mongodb connection error:'));
// successfully connected to mongodb.
db.once('open', function callback () {
});

var allowHeaders = function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    next();
}

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(favicon());
    app.use(logger('dev'));
    // load the backbone front end.
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    // required for passport
    // set up session with mongo store, so we can save the session even if we shut off the server.
    app.use(express.session({
        secret:'secretskidaddles',
        maxAge: new Date(Date.now() + 604800000),
        store: new MongoStore(config.db)
    }));

    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(passport.authenticate('remember-me')); // remember me check box with cookies.
    // set headers.
    app.use(allowHeaders);
    // csrf protection.
    app.use(express.csrf());
    app.use(app.router);

    // error handling.
    // only handle `next(err)` calls
    app.use(function(err, req, res, next) {
        if (err) {
            console.log(err);
            res.send({success: false});
        }
    });

});

require('./routes/routes')(app, passport);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;