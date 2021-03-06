var express = require('express');
var router = express.Router();
var passport = require('passport');
var middleware = require('../middleware');

router.post('/api/login', passport.authenticate('local-login', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/login', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}),
	function (req, res) {
		if (req.body.remember) {
			req.session.cookie.maxAge = 1000 * 60 * 3;
		} else {
			req.session.cookie.expires = false;
		}
		res.redirect('/');
	}
);

router.post('/api/signup', passport.authenticate('local-signup', {
	successRedirect: '/profile', // redirect to the secure profile section
	failureRedirect: '/signup', // redirect back to the signup page if there is an error
	failureFlash: true // allow flash messages
}));

router.get('/api/profile', middleware.isLoggedIn, function (req, res) {
	res.json(req.user);
});

router.get('/api/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
