// importing model and libraries to be used
const User = require('../models/user');
const Task = require('../models/task');
const fs = require('fs');
const path = require('path');
const randomize = require('randomatic');
const updatePassMailer = require('../mailers/update_pass_mailer');
const confirmPassMailer = require('../mailers/confirm_pass_mailer');

var monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

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

// profile page
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title: 'User | Profile',
            user: user
        });    
    });
}

// update profile
module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     try{
    //         let user = await User.findById(req.params.id);
    //         User.uploadedAvatar(req,res,function(err){
    //             if(err){console.log('error',err);}
                
    //             user.fname = req.body.fname;
    //             user.lname = req.body.lname;
    //             user.email = req.body.email;

    //             if(req.file){

    //                 if(user.avatar !== undefined){
    //                     if(fs.existsSync(path.join(__dirname,'..',user.avatar))){
    //                         fs.unlinkSync(path.join(__dirname,'..',user.avatar));    
    //                     }
    //                 }

    //                 user.avatar = User.avatarPath + '/' + req.file.filename;
    //             }
    //             user.save();

    //             req.flash('success','Profile Updated!!');
    //             return res.redirect('back');
    //         });
    //     }catch(err){
    //         console.log(err);
    //         req.flash('error', err);
    //         return res.redirect('back');
    //     }
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }
    
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            req.flash('success','Profile Updated!!');
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}

// password update page
module.exports.updPassword = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('update_pass',{
            title: 'User | Reset Password',
            user: user
        });
    });
}

// generating code for reseting password
module.exports.generateCode = function(req,res){
    User.findById(req.params.id,function(err,user){
        let code = randomize('A0',6);

        user.updatePasswordCode = code;
        user.updatePasswordExpires = Date.now() + 3600000;

        user.save();

        updatePassMailer.newMail(user,code);

        req.flash('info','Verification code is sent to your email..');
        return res.redirect(`/user/password/update/${user.id}`);
    });
}

// reseting the password
module.exports.reset = function(req,res){
    User.findOne({updatePasswordCode: req.body.ver_code, updatePasswordExpires: {$gt: Date.now()}},function(err,user){
        if(!user){
            req.flash('error', 'Verification Code is invalid or has expired..');
            return res.redirect('back');
        }

        if(req.body.new_password != req.body.confirm_new_password){
            req.flash('error','Passwords do not match !!');
            req.flash('error',' Try Again..');
            return res.redirect('back');
        }

        user.password = req.body.new_password;
        user.updatePasswordCode = undefined;
        user.updatePasswordExpires = undefined;

        user.save();

        confirmPassMailer.newMail(user);

        req.flash('success','Password updated successfully!!');
        return res.redirect(`/user/profile/${user._id}`);
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
            User.create({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: req.body.password
            },function(err,user){
                if(err){console.log('error in creating the user while signing up'); return}

                req.flash('success', 'Signed Up Successfully!!');
                req.flash('success',' Please Log In to Continue....');
                return res.redirect('/');
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