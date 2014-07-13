// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

var RememberMeStrategy = require('passport-remember-me').Strategy;

// load up the user model
var User       		= require('../models/User');

var mongoose        = require('mongoose');

var Token = require('../models/Token');

var utils = require('../config/utils');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy(
        function(username, password, done) {
            // we are checking to see if the user trying to login already exists
            User.findOne({'local.username': username}, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false);
                } 
                // create the new user goddamit
                else {
                    // create the user
                    var new_user = new User();
                    // set the user's local credentials
                    new_user.local.username = username;
                    new_user.local.password = new_user.generateHash(password);
                    // save the user
                    new_user.save(function(err) {
                        if (err)
                            return done(err);
                        return done(null, new_user);
                    });
                }
            }
        );    
    }));

    passport.use('local-login', new LocalStrategy(
        function(username, password, done) {
            // console.log(username + " : " + password);
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({'local.username':  username}, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false); 

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false);

                // all is well, return successful user
                return done(null, user);
            });
        }

    ));


    /**
     * Remember Me cookie strategy
     * This strategy consumes a remember me token, supplying the user the
     * token was originally issued to.  The token is single-use, so a new
     * token is then issued to replace it.
     */
    passport.use(new RememberMeStrategy(
        // verify token callback.
        function(token, done) {
            // delete the token and find the user that belonged to it.
            // 1) find the token and user id.
            // 2) delete the cookie. 
            // 3) return the user.
            Token.findOne({ token: token }, function(err, cookie_token) {
                if (err) 
                    return done(err);
                if (!cookie_token) 
                    return done(null, false);

                //Remove all the documents that match
                cookie_token.remove(function(err) {
                    if (err) return done(err);
                });  
                // check to make sure the user really exists.
                User.findById(cookie_token.userId, function(err, user) {
                    // if there are any errors, return the error before anything else
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!user)
                        return done(null, false); 

                    // return the user.
                    return done(null, user);
                });
            });
        },
        // issue callback to issue a new token for the user.
        function(user, done) {
            // once the user has been found, create a new token and save the user to it. 
            var token = utils.randomString(64);
            var cookie_token = new Token({ token: token, userId: user.id });
            cookie_token.save(function(err) {
                if (err)
                    return done(err);
                return done(null, token);
            });
        }
    ));

};








