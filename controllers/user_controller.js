// importing model to be used
const User = require('../models/user');

// profile page
module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'User | Profile'
    });
}