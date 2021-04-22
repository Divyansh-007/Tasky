// importing model and libraries to be used
const Task = require('../models/task');
const taskMailer = require('../mailers/task_mailer');

// create task with async await and mailer call
module.exports.create = async function(req,res){
    try {
        let task = await Task.create({
            description: req.body.description,
            category: req.body.category,
            date: req.body.date,
            status: 'incomplete',
            user: req.user._id
        });

        task = await task.populate('user', 'fname lname email').execPopulate();
        taskMailer.newTask(task);
        
        req.flash('success','Task Created!!');
        return res.redirect('back');
    }catch(err){
        console.log('error in creating task');
        req.flash('error', err);
        return;   
    }
}

// create task
// module.exports.create = function(req,res){
//     Task.create({
//         description: req.body.description,
//         category: req.body.category,
//         date: req.body.date,
//         status: 'incomplete',
//         user: req.user._id
//     },function(err){
//         if(err){
//             console.log('error in creating task');
//         }

//         req.flash('success','Task Created!!');
//         return res.redirect('back');
//     });
// }

// marking an existing task as completed
module.exports.complete = function(req,res){
    let id = req.params.id;
    
    Task.findByIdAndUpdate(id, {status: 'completed'}, function(err){
        if(err){
            console.log('error!!');
            return;
        }

        req.flash('success','Task Completed!!');
        return res.redirect('back');
    });   
}

// deleting completed tasks  
module.exports.destroy = function(req,res){
    Task.deleteMany({status : 'completed'},function(err){
        if(err){
            console.log('error!!');
        }

        req.flash('success','Completed Tasks Deleted....');
        return res.redirect('back');
    });
}