const nodeMailer = require('../config/nodemailer');

const monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

exports.newTask = (task) => {
    let htmlString = nodeMailer.renderTemplate({
        task: task,
        month_list: monthList
    }, '/tasks/new_task.ejs');

    nodeMailer.transporter.sendMail({
        from: 'Tasky',
        to: task.user.email,
        subject: 'New Task Created',
        // html: '<h1> Yup, your task was created'
        html: htmlString
    },(err,info) => {
        if(err){console.log('error in sending mail',err); return;}

        console.log('Message Sent',info);
    });
}