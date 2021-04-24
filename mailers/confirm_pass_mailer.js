const nodeMailer = require('../config/nodemailer');

exports.newMail = (user) => {
    let htmlString = nodeMailer.renderTemplate({
        user: user
    }, '/users/confirm_pass.ejs');

    nodeMailer.transporter.sendMail({
        from: 'Tasky',
        to: user.email,
        subject: 'Password Updated',
        html: htmlString
    },(err,info) => {
        if(err){console.log('error in sending mail',err); return;}

        console.log('Message Sent',info);
    });
}