const nodeMailer = require('../config/nodemailer');

exports.newMail = (user,token) => {
    let htmlString = nodeMailer.renderTemplate({
        user: user,
        token: token
    }, '/passwords/forget_pass.ejs');

    nodeMailer.transporter.sendMail({
        from: 'Tasky',
        to: user.email,
        subject: 'Reset Password Request',
        // text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        // 'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        // 'http://localhost:8000' + '/password/reset/' + token + '\n\n' +
        // 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        html: htmlString
    },(err,info) => {
        if(err){console.log('error in sending mail',err); return;}

        console.log('Message Sent',info);
    });
}