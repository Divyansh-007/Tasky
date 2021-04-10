// importing model to be used
const User = require('../models/user');
const Task = require('../models/task');

var monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// profile page
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title: 'User | Profile',
            user: user
        });    
    });
}

// home page
module.exports.home = function(req,res){
    Task.find({})
    .sort('-createdAt')
    .populate('user')
    .exec(function(err,tasks){
        return res.render('user_tasks',{
            title: 'User | Tasks',
            month_list: monthList,
            task_list: tasks
        });    
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
        req.flash('error','Passwords do not match !!');
        req.flash('error',' Try Again..');
        return res.redirect('back');
    }

    User.findOne({email : req.body.email},function(err,user){
        if(err){console.log('error in finding the user for signing up'); return}

        if(!user){
            User.create(req.body,function(er,user){
                if(err){console.log('error in creating the user while signing up'); return}

                req.flash('success', 'Signed Up Successfully!!');
                req.flash('success',' Please Log In to Continue....');
                return res.redirect('/user/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });
}

// signing in
module.exports.createSession = function(req,res){
    req.flash('success','Logged In Successfully!!');
    return res.redirect('/user/home');
}

// signing out
module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','Logged Out Successfully!!');

    return res.redirect('/');
}