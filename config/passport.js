const passport = require('passport');
//Require the OAuth Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy (
    // Configuration object
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    // The verify callback function
    async function(accessToken, refreshToke, profile, cb) {
        try {
            // A user has logged in with OAuth
            let user = await User.findOne({ googleID: profile.id });
            // Existing user found, so provide it to passport
            if (user) return cb(null, user);
            // We have a new user via OAuth
            user = await User.create({
                name: profile.displayName,
                googleID: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            });
            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    }
));

passport.serializeUser(function(user,cb) {
    cb(null, user._id);
});

passport.deserializeUser(async function(userId, cb) {
    cb(null, await User.findById(userId));
});