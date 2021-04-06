// importing model to be used
const User = require('../models/user');

// profile page
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title: 'User | Profile',
            user: user
        });    
    });
    
    // return res.render('user_profile',{
    //     title: 'User | Profile'
    // });
}

// home page
module.exports.home = function(req,res){
    return res.render('user_tasks',{
        title: 'User | Tasks'
    });
}

// sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/home');
    }
    
    return res.render('user_sign_up',{
        title: 'Tasky | Sign Up'
    });
}

// sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/home');
    }

    return res.render('user_sign_in',{
        title: 'Tasky | Sign In'
    });
}

// signing up
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email : req.body.email},function(err,user){
        if(err){console.log('error in finding the user for signing up'); return}

        if(!user){
            User.create(req.body,function(er,user){
                if(err){console.log('error in creating the user while signing up'); return}

                return res.redirect('/user/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });
}

// signing in
module.exports.createSession = function(req,res){
    return res.redirect('/user/home');
}

// signing out
module.exports.destroySession = function(req,res){
    req.logout();

    return res.redirect('/');
}