var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HomeDekor' });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {// Requesting the user's profile and email
    scope: ['profile', 'email'],
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/ideas',
    failureRedirect: '/ideas'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/ideas');
  });
});

module.exports = router;

