// required libraries and models
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// new authentication with flash message
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req,email,password,done){
        User.findOne({email : email},function(err,user){
            if(err){
                req.flash('error',err);
                // console.log('error in finding the user');
                return done(err);
            }

            if(!user || user.password != password){
                req.flash('error','Invalid Email/Password');
                // console.log('Invalid Email/Password');
                return done(null,false);
            }

            return done(null,user);
        });
    }
));

// // new authentication
// passport.use(new LocalStrategy(
//     {
//         usernameField: 'email'
//     },
//     function(email,password,done){
//         User.findOne({email : email},function(err,user){
//             if(err){
//                 console.log('error in finding the user');
//                 return done(err);
//             }

//             if(!user || user.password != password){
//                 console.log('Invalid Email/Password');
//                 return done(null,false);
//             }

//             return done(null,user);
//         });
//     }
// ));

// serializing the user id for cookie
passport.serializeUser(function(user,done){
    return done(null,user.id);
});

// deserializing the user id from cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding the user');
            return done(err);
        }

        return done(null,user);
    });
});

// checking authentication
passport.checkAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/user/sign-in');
}

// setting authenticated user
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;