var AuthCtrl = require('../routes/auth');

module.exports = function(app, passport) {

	// Local Auth

	// Logged in
	app.get('/session', auth, AuthCtrl.authenticated);
	// Login
	app.post('/session', passport.authenticate('local-login'), AuthCtrl.login);
	// Sign up
	app.post('/signup', passport.authenticate('local-signup'), AuthCtrl.signup);
	// Trying to log in, when allready logged in.
	app.put('/session', AuthCtrl.login_twice);
	// logout
	app.del('/session/:id', AuthCtrl.logout);
};

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
 	if (!req.isAuthenticated()) {
    	res.send({auth: false, _csrf: req.csrfToken()});
  	}
  	else {
  		return next();
  	}
};

