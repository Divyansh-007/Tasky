const nodeMailer = require('../config/nodemailer');

exports.newMail = (user) => {
    let htmlString = nodeMailer.renderTemplate({
        user: user
    }, '/passwords/reset_pass.ejs');

    nodeMailer.transporter.sendMail({
        from: 'Tasky',
        to: user.email,
        subject: 'Password Updated',
        // text: 'Hello,\n\n' +
        // 'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        html: htmlString
    },(err,info) => {
        if(err){console.log('error in sending mail',err); return;}

        console.log('Message Sent',info);
    });
}