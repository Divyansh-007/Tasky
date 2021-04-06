// importing model to be used
const Task = require('../models/task');

// create task
module.exports.create = function(req,res){
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date,
        status: 'incomplete',
        user: req.user._id
    },function(err){
        if(err){
            console.log('error in creating task');
        }

        return res.redirect('back');
    });
}

// marking an existing task as completed
module.exports.complete = function(req,res){
    let id = req.params.id;
    
    Task.findByIdAndUpdate(id, {status: 'completed'}, function(err){
        if(err){
            console.log('error!!');
            return;
        }

        return res.redirect('back');
    });   
}

// deleting completed tasks  
module.exports.destroy = function(req,res){
    Task.deleteMany({status : 'completed'},function(err){
        if(err){
            console.log('error!!');
        }

        return res.redirect('back');
    });
}