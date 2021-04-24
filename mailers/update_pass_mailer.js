const nodeMailer = require('../config/nodemailer');

exports.newMail = (user,code) => {
    let htmlString = nodeMailer.renderTemplate({
        user: user,
        code: code
    }, '/users/update_pass.ejs');

    nodeMailer.transporter.sendMail({
        from: 'Tasky',
        to: user.email,
        subject: 'Reset Password Request',
        html: htmlString
    },(err,info) => {
        if(err){console.log('error in sending mail',err); return;}

        console.log('Message Sent',info);
    });
}