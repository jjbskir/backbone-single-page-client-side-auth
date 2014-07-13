
var utils = require('../config/utils');

var Token = require('../models/Token');

module.exports = (function() {

	var auth = {

		authenticated: function(req, res) {
			// if there is a user then save it in the session. Created in the login authentication.
			req.session.user = req.user;
			// if checked to remember me.
			// cookie the user info with a ID.
	    	if (req.body.remember_me) {
	    		remember_me(req, res);
	    	}
	    	else {
	    		res.send({auth: true, id: req.session.id, user: req.session.user});
	    	}		
		},

		login: function(req, res) {
			auth.authenticated(req, res);
		},

		signup: function(req, res) {
			auth.authenticated(req, res);		
		},

		login_twice: function(req, res) {
			next();
		},

		logout: function(req, res) {
			// destroy the remember me cookie for the user.
			forget_me(req, res);
			req.logout();
			res.send({auth: false, _csrf: req.csrfToken()});    	
		}

	};

	return auth;

})();

// private methods

// function to help with remembering me!
var remember_me = function(req, res, next) {
	var token = utils.randomString(64);
	// try saving the user in a cookie.
	var cookie_token = new Token({ token: token, userId: req.user.id });
	cookie_token.save(function(err) {
      	if (err) 
      		return done(err);
      	res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
      	res.send({auth: true, id: req.session.id, user: req.session.user});
	});    		
};

// forget I ever existed :(
var forget_me = function(req, res, next) {
	// destroy the remember me cookie for the user.
	var remember_me_token = req.cookies.remember_me;
	if (remember_me_token) {
		// clear the remember me cookie when logging out
		res.clearCookie('remember_me');
		// delete the cookie from the db.
		Token.remove({ token: remember_me_token }, function(err) {
			if (err) return done(err);
		});
	}
};
