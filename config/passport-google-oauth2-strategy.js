// required libraries and models
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_url
},function(accessToken,refreshToken,profile,done){
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){console.log('error in google-passport-startegy',err); return;}

        console.log(profile);

        let name = profile.displayName.split(" ");
        let firstName;
        let lastName;
        if(name.length >= 2){
            firstName = name[0];
            lastName = name[1];
        }else{
            firstName = name[0];
            lastName = " ";
        }

        if(user){
            return done(null,user);
        }else{
            User.create({
                fname: firstName,
                lname: lastName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){console.log('error in creating the user using google-passport-strategy',err); return;}

                return done(null,user);
            });
        }
    });
}));

module.exports = passport;