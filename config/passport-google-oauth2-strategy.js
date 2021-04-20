// required libraries and models
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: '1023005453156-49o2tl4338pf04qhio2a135igghtg31j.apps.googleusercontent.com',
    clientSecret: 'EgoXdbCvhL4Pyb_cP3Q2oOmx',
    callbackURL: 'http://localhost:8000/user/auth/google/callback'
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