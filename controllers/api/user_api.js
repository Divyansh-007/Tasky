// required libraries and models
const User = require('../../models/user');
const Task = require('../../models/task');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    try {
        let user = await User.findOne({email: req.body.email});
        
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                mesage: 'Invaid Email/Password'
            });
        }

        return res.status(200).json({
            message: 'Sign In Successfully!!, here is your token',
            data: {
                token: jwt.sign(user.toJSON(),'Tasky',{expiresIn: '100000'})
            }
        });
    }catch(err){
       console.log(err);
       return res.status(500).json({
           message: 'Internal Server Error'
       }); 
    }
}

module.exports.home = async function(req,res){
    try {
        let tasks = await Task.find({user: req.user}).populate('user','fname');
        
        if(tasks.length === 0){
            return res.status(200).json({
                message: 'No Tasks are there for you',
                data:{
                    tasks: []
                }
            });
        }

        return res.status(200).json({
            message: 'List of Tasks',
            data:{
                tasks: tasks
            }
        });
    }catch(err){
        console.log(err);
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
}