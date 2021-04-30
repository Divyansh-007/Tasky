// importing model and libraries to be used
const User = require('../models/user');
const forgetPassMailer = require('../mailers/forget_pass_mailer');
const resetPassMailer = require('../mailers/reset_pass_mailer');
const crypto = require('crypto');

// forget password page
module.exports.forget = function(req,res){
    return res.render('forget_pass',{
        title: 'Tasky | Forget Password'
    });
}

// sending mail to concerned used for reseting password
module.exports.generateNew = async function(req,res){
    try {
        let user = await User.findOne({email: req.body.email});

        if(!user){
            req.flash('error', 'No account with that email address exists!!');
            return res.redirect('/password/forget');
        }

        let token = crypto.randomBytes(20).toString('hex');

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        
        user.save();

        forgetPassMailer.newMail(user,token);

        req.flash('info','Password reset link has been sent to your email..');
        return res.redirect('back');
    }catch(err){
        console.log('error in generating new password');
        req.flash('error', err);
        return;      
    }
}

// reset password page
module.exports.reset = function(req,res){
    User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}},function(err,user){
        if(!user){
            req.flash('error', 'Password reset token is invalid or has expired..');
            return res.redirect('/password/forgot');
        }

        return res.render('reset_pass',{
            title: 'Tasky | Reset Password',
            token: req.params.token
        });
    });
}

// updating the password
module.exports.update = async function(req,res){
    try {
        let user = await User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}});

        if(!user){
            req.flash('error', 'Password reset token is invalid or has expired..');
            return res.redirect('back');
        }

        if(req.body.new_password != req.body.confirm_new_password){
            req.flash('error','Passwords do not match !!');
            req.flash('error',' Try Again..');
            return res.redirect('back');
        }

        user.password = req.body.new_password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save();

        resetPassMailer.newMail(user);

        req.flash('success','Password updated successfully!!');
        req.flash('success','Please Login..');
        return res.redirect('/');
    }catch(err){
        console.log('error in updating password',err);
        req.flash('error', err);
        return;
    }
}
